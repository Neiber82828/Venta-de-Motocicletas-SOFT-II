import api from './api';

export const getPedidos = async () => {
  const res = await api.get('/api/pedidos/');
  return res.data;
};

export const createPedido = async (data) => {
  const res = await api.post('/api/pedidos/', data);
  return res.data;
};

export const updatePedido = async (id, data) => {
  const res = await api.patch(`/api/pedidos/${id}/`, data);
  return res.data;
};

export const cambiarEstado = async (id, estado, comentarios = '') => {
  const res = await api.patch(`/api/pedidos/${id}/cambiar-estado/`, { estado, comentarios });
  return res.data;
};

export const getReporte = async (params = {}) => {
  const res = await api.get('/api/pedidos/reporte/', { params });
  return res.data;
};

export const createDetalle = async (data) => {
  const res = await api.post('/api/detalles-pedido/', data);
  return res.data;
};
