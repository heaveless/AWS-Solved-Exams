import { SwapiFilm, SwapiPeople } from '@modules/swapi/swapi.model';
import dynamoose from 'dynamoose';

const PlanetSchema = new dynamoose.Schema(
  {
    ref: {
      type: String,
      hashKey: true,
    },
    id: String,
    name: String,
    rotation_period: String,
    orbital_period: String,
    diameter: String,
    climate: String,
    gravity: String,
    terrain: String,
    surface_water: String,
    population: String,
  },
  {
    timestamps: true,
  },
);

export class Planet {
  id!: string;
  ref!: string;
  name!: string;
  rotation_period!: string;
  orbital_period!: string;
  diameter!: string;
  climate!: string;
  gravity!: string;
  terrain!: string;
  surface_water!: string;
  population!: string;
}

export type PlanetExt = Planet & {
  residents: Array<SwapiPeople>;
  films: Array<SwapiFilm>;
};

export type PlanetDto = Omit<Planet, 'ref'>;

export const PlanetEntity = dynamoose.model('Planet', PlanetSchema);
