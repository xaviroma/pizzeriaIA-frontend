import api from '../axiosConfig';

export const getPizzas = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;  // Datos que recibes del servidor
  } catch (error) {
    console.error('Error al obtener pizzas', error);
    throw error;
  }
};
