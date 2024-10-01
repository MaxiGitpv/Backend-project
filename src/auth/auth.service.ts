import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/users.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para validar al usuario
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    // Si no se encuentra al usuario, nos retornara null
    if (!user) {
      return null; // Esto evita lanzar una excepción aquí
    }

    // Comparamos la contraseña
    if (bcrypt.compareSync(password, user.password)) {
      const { password: _, ...result } = user; // Excluir la contraseña
      return result; // Devuelve el usuario sin la contraseña
    }

    return null; // Si la contraseña no coincide, también retorna null
  }

  // Método para iniciar sesión
  async login(req: { email: string; password: string }) {
    console.log("Datos recibidos para login:", req); // Para verificar los datos recibidos
    const user = await this.validateUser(req.email, req.password);
    console.log("Usuario validado:", user); // Para verificar el usuario encontrado

    if (!user) {
      throw new Error("Invalid credentials"); // Manejo de error si no se encuentra el usuario
    }

    const payload = { username: user.email, sub: user._id }; // Payload para JWT
    return {
      access_token: this.jwtService.sign(payload), // Genera el token
    };
  }
}
