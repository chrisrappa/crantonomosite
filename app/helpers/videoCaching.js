// In-memory video cache storage
const cache = {
  shorts: [],
  fullLength: [],
};

export const getCachedShorts = () => {
  return cache.shorts;
};

export const setCachedShorts = (videos) => {
  cache.shorts = videos;
};

export const getCachedFullLength = () => {
  return cache.fullLength;
};

export const setCachedFullLength = (videos) => {
  cache.fullLength = videos;
};
