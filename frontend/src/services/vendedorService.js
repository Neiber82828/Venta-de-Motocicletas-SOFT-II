import api from './api';

export const getVendedores = async () => {
  const res = await api.get('/api/vendedores/');
  const data = res.data;
  return Array.isArray(data) ? data : data.results ?? [];
};
