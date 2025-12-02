const express = require("express");
const cors = require("cors");
const pool = require("./db"); // usamos tu db.js

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para guardar cumpleaños
app.post("/save", async (req, res) => {
  const { nombre, fecha } = req.body;

  try {
    await pool.query("INSERT INTO cumple (nombre, fecha) VALUES ($1, $2)", [nombre, fecha]);
    res.status(200).send("Cumpleaños guardado");
  } catch (error) {
    console.error("Error al guardar en la base de datos:", error);
    res.status(500).send("Error al guardar");
  }
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
