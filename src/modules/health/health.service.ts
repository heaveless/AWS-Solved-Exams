import { Injectable } from '@heaveless/core';
import { HealthBase, HealthStatus, Health } from './health.model';
import { PlanetEntity } from '@modules/planet/planet.model';
import { HttpService } from '@shared/services/http.service';

@Injectable()
export class HealthService {
  constructor(private readonly httpService: HttpService) {}

  private async pingDynamoDb(): Promise<HealthBase> {
    try {
      const record = await PlanetEntity.scan().limit(1).exec();

      let info: HealthStatus = 'down';
      if (record) {
        info = 'up';
      }

      return {
        info,
      };
    } catch (error) {
      return {
        info: 'down',
        error: String(error),
      };
    }
  }

  private async pingRedis(): Promise<HealthBase> {
    try {
      const record = await this.httpService.get('/api');

      let info: HealthStatus = 'down';
      if (record) {
        info = 'up';
      }

      return {
        info,
      };
    } catch (error) {
      return {
        info: 'down',
        error: String(error),
      };
    }
  }

  private async pingSwapi(): Promise<HealthBase> {
    try {
      const record = await this.httpService.get('/api');

      let info: HealthStatus = 'down';
      if (record) {
        info = 'up';
      }

      return {
        info,
      };
    } catch (error) {
      return {
        info: 'down',
        error: String(error),
      };
    }
  }

  async health(): Promise<Health> {
    const dynamodb = await this.pingDynamoDb();
    const redis = await this.pingRedis();
    const swapi = await this.pingSwapi();

    return {
      dynamodb,
      redis,
      swapi,
    };
  }
}
