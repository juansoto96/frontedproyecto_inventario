import { useEffect, useState } from 'react';
import { getProductos, postProducto } from './services/api'; // Importar desde services/api
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    cantidad: ''
  });

  // Obtener productos al cargar la página
  useEffect(() => {
    getProductos()
      .then(data => setProductos(data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, []);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para agregar un nuevo producto
  const agregarProducto = (e) => {
    e.preventDefault();
    const { nombre, cantidad } = nuevoProducto;

    // Validar los datos
    if (!nombre || !cantidad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const producto = {
      nombre,
      cantidad: parseInt(cantidad, 10)
    };

    postProducto(producto)
      .then(() => {
        alert('Producto agregado con éxito');
        // Limpiar formulario
        setNuevoProducto({ nombre: '', cantidad: '' });
        return getProductos(); // Refrescar lista de productos
      })
      .then(data => setProductos(data))
      .catch(err => console.error('Error al agregar producto:', err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inventario de Productos</h1>
      </header>

      <section>
        <h2>Agregar Producto</h2>
        <form onSubmit={agregarProducto}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nuevoProducto.nombre}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={nuevoProducto.cantidad}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Agregar Producto</button>
        </form>
      </section>

      <section>
        <h2>Lista de Productos</h2>
        <ul>
          {productos.map(producto => (
            <li key={producto.id}>
              {producto.nombre} - {producto.cantidad} unidades
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;

