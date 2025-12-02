import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Ruta GET: obtener todos los cumpleaños
app.get("/cumples", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM cumple");
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener cumpleaños:", error.message);
    res.status(500).json({ error: "Error al obtener cumpleaños" });
  }
});

// Ruta POST: guardar cumpleaños
app.post("/save", async (req, res) => {
  try {
    const { nombre, fecha } = req.body;
    console.log("Datos recibidos en backend:", req.body);

    await pool.query(
      "INSERT INTO cumple (nombre, fecha) VALUES ($1, $2)",
      [nombre, fecha]
    );

    // ✅ Respuesta en JSON para que el frontend la interprete bien
    res.status(200).json({ mensaje: "Guardado con éxito" });
  } catch (error) {
    console.error("Error al guardar:", error.message);
    res.status(500).json({ error: "Error al guardar: " + error.message });
  }
});

// Levantar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});