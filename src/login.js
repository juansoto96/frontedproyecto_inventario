import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { username, password }, // Se envía la contraseña en texto plano
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", // Asegurar que el backend lo acepte
          },
        }
      );
      
      // Guardar el token en localStorage y actualizar estado
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/");

    } catch (err) {
      // Depuración: Mostrar errores del backend en la consola
      console.error("Error en la autenticación:", err.response?.data || err.message);
      
      // Mensaje de error más específico
      setError(err.response?.data?.message || "Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Ingresar</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

// Estilos CSS en objeto JS
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  loginBox: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    fontSize: "18px",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    fontSize: "18px",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Login;





