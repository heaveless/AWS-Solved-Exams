import { Injectable } from '@heaveless/core';
import { Planet, PlanetDto, PlanetEntity } from './planet.model';

@Injectable()
export class PlanetProvider {
  async create(dto: PlanetDto): Promise<void> {
    const entity = new PlanetEntity(dto);
    await entity.save();
  }

  async getOne(id: string): Promise<Planet> {
    const record = await PlanetEntity.get(id);
    return record.toJSON() as Planet;
  }

  async getAll(): Promise<Array<Planet>> {
    const records = await PlanetEntity.scan().exec();
    return records.toJSON() as Array<Planet>;
  }
}
