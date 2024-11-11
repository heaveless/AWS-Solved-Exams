import { Test } from '@heaveless/testing';
import { expect, describe, beforeEach, it } from '@jest/globals';
import { PlanetService } from '@modules/planet/planet.service';
import { PlanetProvider } from '@modules/planet/planet.provider';
import { SwapiService } from '@modules/swapi/swapi.service';
import { Planet, PlanetDto } from '@modules/planet/planet.model';

describe('PlanetService', () => {
  let testing: Test;
  let planetService: PlanetService;

  beforeEach(async () => {
    testing = Test.createUnit(PlanetService);
    planetService = testing.compile();
  });

  describe('create', () => {
    it('should create a new planet with a unique ref', async () => {
      const dto: PlanetDto = {
        id: '1',
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'árido',
        gravity: '1 estándar',
        terrain: 'desierto',
        surface_water: '1',
        population: '200000',
      };

      testing.update(PlanetProvider, 'create', undefined);

      await expect(planetService.create(dto)).resolves.toBeUndefined();
    });
  });

  describe('getOne', () => {
    it('should return a planet with residents and films', async () => {
      const ref = '52c80e022aac44f8a06f0d1e8b7b6028';
      const planetRecord = {
        ref,
        climate: 'árido',
        rotation_period: '23',
        population: '200000',
        orbital_period: '304',
        surface_water: '1',
        diameter: '10465',
        gravity: '1 estándar',
        name: 'jjjjjjjjj',
        id: '1',
        terrain: 'desierto',
      };
      const residents = [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.py4e.com/api/planets/1/',
          films: ['https://swapi.py4e.com/api/films/1/'],
          species: ['https://swapi.py4e.com/api/species/1/'],
          vehicles: ['https://swapi.py4e.com/api/vehicles/14/'],
          starships: ['https://swapi.py4e.com/api/starships/12/'],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.py4e.com/api/people/1/',
        },
      ];
      const films = [
        {
          title: 'A New Hope',
          episode_id: '4',
          opening_crawl:
            "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
          director: 'George Lucas',
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1977-05-25',
          characters: ['https://swapi.py4e.com/api/people/1/'],
          planets: ['https://swapi.py4e.com/api/planets/1/'],
          starships: ['https://swapi.py4e.com/api/starships/2/'],
          vehicles: ['https://swapi.py4e.com/api/vehicles/4/'],
          species: ['https://swapi.py4e.com/api/species/1/'],
          created: '2014-12-10T14:23:31.880000Z',
          edited: '2014-12-20T19:49:45.256000Z',
          url: 'https://swapi.py4e.com/api/films/1/',
        },
      ];

      testing.update(PlanetProvider, 'getOne', planetRecord);
      testing.update(SwapiService, 'getResidentsById', residents);
      testing.update(SwapiService, 'getFilmsById', films);

      const result = await planetService.getOne(ref);

      expect(result).toStrictEqual({
        ...planetRecord,
        residents,
        films,
      });
    });
  });

  describe('getAll', () => {
    it('should return an array of planets', async () => {
      const planets: Planet[] = [
        {
          climate: 'árido',
          rotation_period: '23',
          population: '200000',
          orbital_period: '304',
          ref: '52c80e022aac44f8a06f0d1e8b7b6028',
          surface_water: '1',
          diameter: '10465',
          gravity: '1 estándar',
          name: 'jjjjjjjjj',
          id: '1',
          terrain: 'desierto',
        },
      ];

      testing.update(PlanetProvider, 'getAll', planets);

      const result = await planetService.getAll();

      expect(result).toStrictEqual(planets);
    });

    it('should return an empty array when no planets are available', async () => {
      testing.update(PlanetProvider, 'getAll', []);

      const result = await planetService.getAll();

      expect(result).toStrictEqual([]);
    });
  });
});
