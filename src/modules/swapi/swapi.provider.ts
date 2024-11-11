import { Injectable } from '@heaveless/core';
import { HttpService } from '@shared/services/http.service';
import { SwapiFilm, SwapiPeople, SwapiPlanet } from './swapi.model';

@Injectable()
export class SwapiProvider {
  constructor(private readonly httpService: HttpService) {}

  getPlanetById(id: string): Promise<SwapiPlanet> {
    return this.httpService.get<SwapiPlanet>(`/api/planets/${id}`);
  }

  getPeopleById(id: string): Promise<SwapiPeople> {
    return this.httpService.get<SwapiPeople>(`/api/people/${id}`);
  }

  getFilmById(id: string): Promise<SwapiFilm> {
    return this.httpService.get<SwapiFilm>(`/api/films/${id}`);
  }
}
