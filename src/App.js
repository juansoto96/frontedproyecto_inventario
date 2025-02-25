import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { getProductos, postProducto } from "./services/api";
import Login from "./login";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", cantidad: "" });
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Verifica si el usuario tiene sesión iniciada
  const isAuthenticated = !!token;

  // Obtener productos al cargar la página solo si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      getProductos()
        .then((data) => setProductos(data))
        .catch((err) => console.error("Error al obtener productos:", err));
    }
  }, [isAuthenticated]);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prevState) => ({
      ...prevState,
      [name]: value,
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
      cantidad: parseInt(cantidad, 10),
    };

    postProducto(producto)
      .then(() => {
        alert("Producto agregado con éxito");
        setNuevoProducto({ nombre: "", cantidad: "" }); // Limpiar formulario
        return getProductos(); // Refrescar lista de productos
      })
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al agregar producto:", err));
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login"; // Redirigir al login
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div className="App">
                <header className="App-header">
                  <h1>Inventario de Productos</h1>
                  <button onClick={handleLogout}>Cerrar Sesión</button>
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
                    {productos.map((producto) => (
                      <li key={producto.id}>
                        {producto.nombre} - {producto.cantidad} unidades
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


