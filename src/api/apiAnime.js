const API_URL = 'https://api.jikan.moe/v4';

export const fetchAnimeList = async params => {
  const queryParams = new URLSearchParams(params).toString();
  return fetch(`${API_URL}/anime?${queryParams}`, {
    method: 'GET',
  });
};

export const fetchTopAnimeList = async params => {
  const queryParams = new URLSearchParams(params).toString();
  return fetch(`${API_URL}/top/anime?${queryParams}`, {
    method: 'GET',
  });
};

export const fetchRecommendedAnime = async ({ page = 0 }) => {
  return fetch(`${API_URL}/recommendations/anime?page=${page}`, {
    method: 'GET',
  });
};

export const fetchAnimeById = async id => {
  return fetch(`${API_URL}/anime/${id}`, { method: 'GET' });
};
