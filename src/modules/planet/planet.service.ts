import { Injectable } from '@heaveless/core';
import { v4 as uuidv4 } from 'uuid';
import { PlanetProvider } from './planet.provider';
import { Planet, PlanetDto, PlanetExt } from './planet.model';
import { SwapiService } from '@modules/swapi/swapi.service';

@Injectable()
export class PlanetService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly planetProvider: PlanetProvider,
  ) {}

  async create(dto: PlanetDto): Promise<void> {
    const identity = uuidv4().replace(/-/g, '');
    const record = Object.assign(dto, { ref: identity });

    return this.planetProvider.create(record);
  }

  async getOne(ref: string): Promise<PlanetExt> {
    const record = await this.planetProvider.getOne(ref);
    const residents = await this.swapiService.getResidentsById(record.id);
    const films = await this.swapiService.getFilmsById(record.id);
    return {
      ...record,
      residents,
      films,
    };
  }

  getAll(): Promise<Array<Planet>> {
    return this.planetProvider.getAll();
  }
}
