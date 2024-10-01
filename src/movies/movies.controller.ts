import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service'; 
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')

@Controller('movies')  
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {} 
  
  @ApiResponse({status: 200, description: 'Todos las peliculas' })
  @Get('popular') // Ruta para listar películas
async listMovies(@Res() res) {
  try {
    const movies = await this.moviesService.getMovies(); // Llamada al servicio para obtener las películas
    return res.status(HttpStatus.OK).json(movies); // Enviamos las películas como respuesta
  } catch (error) {
    console.error('Error al obtener las películas:', error); // Imprime el error en la consola para más detalles
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Error al obtener las películas',
      error: res.error // Capturamos el error
    });
  }
 }
}




