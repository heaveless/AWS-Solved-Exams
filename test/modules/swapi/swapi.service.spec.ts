import { Test } from '@heaveless/testing';
import { expect, describe, beforeEach, it } from '@jest/globals';
import { SwapiService } from '@modules/swapi/swapi.service';
import { SwapiProvider } from '@modules/swapi/swapi.provider';

describe('SwapiService', () => {
  let testing: Test;
  let swapiService: SwapiService;

  beforeEach(async () => {
    testing = Test.createUnit(SwapiService);
    swapiService = testing.compile();
  });

  describe('getResidentsById', () => {
    it('should return an array of residents for a given planet ID', async () => {
      const id = 'planet123';
      const planetData = {
        climate: 'árido',
        rotation_period: '23',
        population: '200000',
        orbital_period: '304',
        surface_water: '1',
        diameter: '10465',
        gravity: '1 estándar',
        name: 'jjjjjjjjj',
        terrain: 'desierto',
        residents: [''],
        films: ['https://swapi.dev/api/films/1/'],
        created: '',
        edited: '',
        url: '',
      };
      const residents = {
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
      };

      testing.update(SwapiProvider, 'getPlanetById', planetData);
      testing.update(SwapiProvider, 'getPeopleById', residents);

      const residentExpect = [
        {
          birth_year: '19BBY',
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          eye_color: 'blue',
          films: ['https://swapi.py4e.com/api/films/1/'],
          gender: 'male',
          hair_color: 'blond',
          height: '172',
          homeworld: 'https://swapi.py4e.com/api/planets/1/',
          mass: '77',
          name: 'Luke Skywalker',
          skin_color: 'fair',
          species: ['https://swapi.py4e.com/api/species/1/'],
          starships: ['https://swapi.py4e.com/api/starships/12/'],
          url: 'https://swapi.py4e.com/api/people/1/',
          vehicles: ['https://swapi.py4e.com/api/vehicles/14/'],
        },
      ];

      const result = await swapiService.getResidentsById(id);

      expect(result).toStrictEqual(residentExpect);
    });
  });

  describe('getFilmsById', () => {
    it('should return an array of films for a given planet ID', async () => {
      const id = 'planet123';
      const planetData = {
        climate: 'árido',
        rotation_period: '23',
        population: '200000',
        orbital_period: '304',
        surface_water: '1',
        diameter: '10465',
        gravity: '1 estándar',
        name: 'jjjjjjjjj',
        terrain: 'desierto',
        residents: [''],
        films: ['https://swapi.dev/api/films/1/'],
        created: '',
        edited: '',
        url: '',
      };
      const films = {
        title: 'A New Hope',
        episode_id: '4',
        opening_crawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        created: '2014-12-10T14:23:31.880000Z',
        edited: '2014-12-20T19:49:45.256000Z',
        url: 'https://swapi.py4e.com/api/films/1/',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
      };
      testing.update(SwapiProvider, 'getPlanetById', planetData);
      testing.update(SwapiProvider, 'getFilmById', films);

      const expectedFilms = [
        {
          characters: [],
          created: '2014-12-10T14:23:31.880000Z',
          director: 'George Lucas',
          edited: '2014-12-20T19:49:45.256000Z',
          opening_crawl:
            "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
          episode_id: '4',
          planets: [],
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1977-05-25',
          species: [],
          starships: [],
          title: 'A New Hope',
          url: 'https://swapi.py4e.com/api/films/1/',
          vehicles: [],
        },
      ];

      const result = await swapiService.getFilmsById(id);

      expect(result).toStrictEqual(expectedFilms);
    });

    it('should handle empty films array gracefully', async () => {
      const id = 'planet123';
      const planetData = {
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
        created: 'string;',
        edited: 'string;',
        url: 'string;',
        films: [],
        residents: [],
      };

      testing.update(SwapiProvider, 'getPlanetById', planetData);

      const result = await swapiService.getFilmsById(id);

      expect(result).toStrictEqual([]);
    });
  });
});
