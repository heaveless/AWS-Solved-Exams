export type HealthStatus = 'up' | 'down';

export interface HealthBase {
  info: HealthStatus;
  error?: string;
}

export interface Health {
  [module: string]: HealthBase;
}
