import { BaseEntity } from '@shared/types';

export class SwapiPlanet extends BaseEntity {
  name!: string;
  rotation_period!: string;
  orbital_period!: string;
  diameter!: string;
  climate!: string;
  gravity!: string;
  terrain!: string;
  surface_water!: string;
  population!: string;
  residents!: Array<string>;
  films!: Array<string>;
}

export class SwapiPeople extends BaseEntity {
  name!: string;
  height!: string;
  mass!: string;
  hair_color!: string;
  skin_color!: string;
  eye_color!: string;
  birth_year!: string;
  gender!: string;
  homeworld!: string;
  films!: Array<string>;
  species!: Array<string>;
  vehicles!: Array<string>;
  starships!: Array<string>;
}

export class SwapiFilm extends BaseEntity {
  title!: string;
  episode_id!: string;
  opening_crawl!: string;
  director!: string;
  producer!: string;
  release_date!: string;
  characters!: Array<string>;
  planets!: Array<string>;
  starships!: Array<string>;
  vehicles!: Array<string>;
  species!: Array<string>;
}
