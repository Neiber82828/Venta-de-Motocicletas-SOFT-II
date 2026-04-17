import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

export const getMotocicletas = () => api.get('/motocicletas/')
export const getMotocicleta = (id) => api.get(`/motocicletas/${id}/`)
export const getPedidos = () => api.get('/pedidos/')
export const crearPedido = (data) => api.post('/pedidos/', data)
export const actualizarPedido = (id, data) => api.put(`/pedidos/${id}/`, data)
export const getClientes = () => api.get('/clientes/')
export const getHistorial = () => api.get('/historial-pedidos/')

export default api