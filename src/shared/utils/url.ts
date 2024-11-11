export const getIdFromUrl = (url: string) => {
  const cleanedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const parts = cleanedUrl.split('/');
  return parts[parts.length - 1];
};
