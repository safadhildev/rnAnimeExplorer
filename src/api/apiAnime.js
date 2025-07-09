export const fetchAnimeList = async params => {
  const queryParams = new URLSearchParams(params).toString();
  console.log('[DEBUG] >> fetchAnimeList >> queryParams >> ', {
    queryParams,
    api: `https://api.jikan.moe/v4/anime?${queryParams}`,
  });
  return fetch(`https://api.jikan.moe/v4/anime?${queryParams}`, {
    method: 'GET',
  });
};

export const fetchRecommendedAnime = async ({ page = 0 }) => {
  return fetch(`https://api.jikan.moe/v4/recommendations/anime?page=${page}`, {
    method: 'GET',
  });
};

export const fetchAnimeById = async id => {
  return fetch(`https://api.jikan.moe/v4/anime/${id}`, { method: 'GET' });
};
