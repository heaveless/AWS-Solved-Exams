import { z } from 'zod';
import { createZodSchema } from '@heaveless/core';

export class PlanetCreate extends createZodSchema(
  z.object({
    id: z.string(),
    nombre: z.string(),
    periodo_rotacion: z.string(),
    periodo_orbital: z.string(),
    diametro: z.string(),
    clima: z.string(),
    gravedad: z.string(),
    terreno: z.string(),
    agua_superficial: z.string(),
    poblacion: z.string(),
  }),
) {}
