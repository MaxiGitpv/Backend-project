import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const apiKey = this.configService.get<string>('TMDB_API_KEY');
    if (!apiKey) {
      throw new Error('TMDB_API_KEY no está definida en las variables de entorno');
    }
    this.apiKey = apiKey;
  }

  async getMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    if (!response) {
      throw new Error('No response received from the API');
    }
    return response.data;
  }
}
