import { Body, Controller, Get, Params, Post } from '@heaveless/core';
import { PlanetService } from './planet.service';
import { PlanetCreate } from './planet.schema';
import { Planet, PlanetExt } from './planet.model';
import { Cacheable, CacheUpdate } from '@type-cacheable/core';

@Controller('planets')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @CacheUpdate({
    cacheKeysToClear: () => ['planet:get_one:*', 'planet:get_all'],
  })
  @Post()
  create(@Body() payload: PlanetCreate): Promise<void> {
    const dto = payload as unknown as Planet;
    return this.planetService.create(dto);
  }

  @Cacheable({
    cacheKey: (args) => `planet:get_one:${args[0]}`,
  })
  @Get(':ref')
  getOne(@Params('ref') ref: string): Promise<PlanetExt> {
    return this.planetService.getOne(ref);
  }

  @Cacheable({ cacheKey: () => 'planet:get_all' })
  @Get()
  getAll(): Promise<Array<Planet>> {
    return this.planetService.getAll();
  }
}
