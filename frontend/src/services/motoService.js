import api from './api';

export const getMotos = async () => {
  const response = await api.get('/api/motos/');
  return response.data;
};

export const getMoto = async (id) => {
  const response = await api.get(`/api/motos/${id}/`);
  return response.data;
};
