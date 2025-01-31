import axios from 'axios';

// Crear instancia de Axios con configuración básica
const api = axios.create({
  baseURL: 'http://localhost:8080/api/productos', // URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Llamada GET para obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await api.get();  // No es necesario '/'; la baseURL ya está definida
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Llamada POST para agregar un nuevo producto
export const postProducto = async (producto) => {
  try {
    const response = await api.post('', producto);  // Igual, sin barra extra
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export default api;

