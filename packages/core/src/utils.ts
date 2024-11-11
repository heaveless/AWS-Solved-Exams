import { Handler } from '@heaveless/common';

export function addLeadingSlash(url: string): string {
  return url.startsWith('/') ? url : `/${url}`;
}

export function buildUrl(...paths: string[]) {
  return paths
    .filter(Boolean)
    .map((path) => (path.startsWith('/') ? path.slice(1) : path))
    .filter(Boolean)
    .join('/');
}

export function extractParamNames(handler: Handler) {
  return /\(\s*([^)]+?)\s*\)/
    .exec(handler.toString())![1]
    .split(',')
    .map((key) => key.trim());
}

export function toStandardType(param: unknown) {
  if (param === 'false' || param === 'true') {
    return param === 'true';
  }

  if (
    typeof param === 'string' &&
    !isNaN(Number(param)) &&
    !isNaN(parseFloat(param))
  ) {
    return parseFloat(param);
  }

  return param;
}
