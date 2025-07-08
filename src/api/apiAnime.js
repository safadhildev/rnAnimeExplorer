export const fetchAnimeList = async () => {
  return fetch('https://api.jikan.moe/v4/anime', { method: 'GET' });
};

export const fetchRecommendedAnime = async ({ page = 0 }) => {
  return fetch(`https://api.jikan.moe/v4/recommendations/anime?page=${page}`, {
    method: 'GET',
  });
};
