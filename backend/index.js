// index.js
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // conexión a Neon
require("dotenv").config();   // carga variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para guardar cumpleaños
app.post("/cumples", async (req, res) => {
  const { nombre, fecha } = req.body;

  if (!nombre || !fecha) {
    return res.status(400).json({ error: "Nombre y fecha son requeridos" });
  }

  try {
    await pool.query(
      "INSERT INTO cumple (nombre, fecha) VALUES ($1, $2)",
      [nombre, fecha]
    );
    res.status(200).json({ mensaje: "Cumpleaños guardado correctamente ✅" });
  } catch (error) {
    console.error("Error al guardar en la base de datos:", error);
    res.status(500).json({ error: "Error al guardar", detalle: error.message });
  }
});

// Ruta para listar cumpleaños
app.get("/cumples", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cumple ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener cumpleaños:", error);
    res.status(500).json({ error: "Error al obtener cumpleaños" });
  }
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente 🚀");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});