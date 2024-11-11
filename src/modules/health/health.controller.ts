import { Controller, Get } from '@heaveless/core';
import { HealthService } from './health.service';
import { Health } from './health.model';

@Controller('healthcheck')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  health(): Promise<Health> {
    return this.healthService.health();
  }
}
