import api from './api';

export const getClientes = async () => {
  const res = await api.get('/api/clientes/');
  const data = res.data;
  return Array.isArray(data) ? data : data.results ?? [];
};
