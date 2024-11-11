import { Injectable } from '@heaveless/core';
import { SwapiFilm, SwapiPeople } from './swapi.model';
import { SwapiProvider } from './swapi.provider';
import { getIdFromUrl } from '@shared/utils';

@Injectable()
export class SwapiService {
  constructor(private readonly swapiProvider: SwapiProvider) {}

  async getResidentsById(id: string): Promise<Array<SwapiPeople>> {
    const planet = await this.swapiProvider.getPlanetById(id);
    const residentsRequests = planet.residents.map((url) =>
      this.swapiProvider.getPeopleById(getIdFromUrl(url)),
    );

    const records = await Promise.all(residentsRequests);

    return records as Array<SwapiPeople>;
  }

  async getFilmsById(id: string): Promise<Array<SwapiFilm>> {
    const planet = await this.swapiProvider.getPlanetById(id);
    const residentsRequests = planet.films.map((url) =>
      this.swapiProvider.getFilmById(getIdFromUrl(url)),
    );

    const records = await Promise.all(residentsRequests);

    return records as Array<SwapiFilm>;
  }
}
