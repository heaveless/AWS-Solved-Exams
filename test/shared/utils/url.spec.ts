import { expect, describe, it } from '@jest/globals';
import { getIdFromUrl } from '@shared/utils';

describe('getIdFromUrl', () => {
  it('should return the last part of the URL', () => {
    const url = 'https://example.com/resource/123';
    const result = getIdFromUrl(url);
    expect(result).toBe('123');
  });

  it('should return the last part of the URL even if it ends with a slash', () => {
    const url = 'https://example.com/resource/123/';
    const result = getIdFromUrl(url);
    expect(result).toBe('123');
  });

  it('should handle URLs with only one segment', () => {
    const url = 'https://example.com/123';
    const result = getIdFromUrl(url);
    expect(result).toBe('123');
  });

  it('should return an empty string if the URL ends with a slash and has no other segments', () => {
    const url = 'https://example.com/';
    const result = getIdFromUrl(url);
    expect(result).toBe('example.com');
  });
});
