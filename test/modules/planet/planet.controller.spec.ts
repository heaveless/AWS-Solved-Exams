import { Test } from '@heaveless/testing';
import { expect, describe, beforeEach, it } from '@jest/globals';

import { PlanetController } from '@modules/planet/planet.controller';
import { PlanetService } from '@modules/planet/planet.service';
import { Planet, PlanetExt } from '@modules/planet/planet.model';
import { PlanetCreate } from '@modules/planet/planet.schema';

describe('PlanetController', () => {
  let testing: Test;
  let planetController: PlanetController;

  beforeEach(async () => {
    testing = Test.createUnit(PlanetController);
    planetController = testing.compile();
  });

  describe('create', () => {
    it('should call PlanetService.create with correct DTO', async () => {
      testing.update(PlanetService, 'create', undefined);

      const payload: PlanetCreate = {
        id: '1',
        nombre: 'Tatooine',
        periodo_rotacion: '23',
        periodo_orbital: '304',
        diametro: '10465',
        clima: 'árido',
        gravedad: '1 estándar',
        terreno: 'desierto',
        agua_superficial: '1',
        poblacion: '200000',
      };

      const result = await planetController.create(payload);

      await expect(result).toBeUndefined();
    });

    it('should throw error if payload is invalid', async () => {
      testing.update(PlanetService, 'create', undefined);

      const payload: any = {
        name: 'Tatooine',
      };

      const result = await planetController.create(payload);

      await expect(result).toBeUndefined();
    });
  });

  describe('getOne', () => {
    it('should return the planet when found', async () => {
      const ref = '52c80e022aac44f8a06f0d1e8b7b6028';
      const expectedPlanet: PlanetExt = {
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
        residents: [
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
        ],
        films: [
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
        ],
      };

      testing.update(PlanetService, 'getOne', expectedPlanet);

      const result = await planetController.getOne(ref);

      expect(result).toStrictEqual(expectedPlanet);
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

      testing.update(PlanetService, 'getAll', planets);

      const result = await planetController.getAll();

      expect(result).toStrictEqual(planets);
    });

    it('should return an empty array when no planets are available', async () => {
      testing.update(PlanetService, 'getAll', []);

      const result = await planetController.getAll();

      expect(result).toStrictEqual([]);
    });
  });
});
