import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcryptjs';




@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Crear nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword, // Guarda la contraseña encriptada
    });

    return await createdUser.save();
  }


  // Obtener todos los usuarios no eliminados
  async findAll(): Promise<User[]> {
    return await this.userModel.find({ isDeleted: false }).exec();
  }

  // Obtener un solo usuario por ID
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user || user.isDeleted) {
      throw new NotFoundException(`EL usuario con ID ${id} No fue encontrado, o fue eliminado`);
    }
    return user;
  }

  // Actualizar un usuario
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser || updatedUser.isDeleted) {
      throw new NotFoundException(`EL usuario con ID ${id} No fue encontrado, o fue eliminado`);
    }
    return updatedUser;
  }

  // Soft delete (marcar como eliminado)
  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).exec();
    if (!result) {
      throw new NotFoundException(`EL usuario con ID ${id} No fue encontrado, o fue eliminado`);
    }
  }

  // Método para buscar un usuario por email
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user; // Devuelve el usuario encontrado o null si no se encuentra
  }
  
  
  // Hashing de contraseñas:
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return user.save();
  }

}
