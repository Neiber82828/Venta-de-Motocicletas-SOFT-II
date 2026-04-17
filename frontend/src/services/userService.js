import api from './api';

// Ejemplo de servicio
export const getUsers = async () => {
  try {
    const response = await api.get('/usuarios/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/usuarios/', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
