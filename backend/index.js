import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 👉 Ruta POST: guardar cumpleaños (coincide con el frontend que usa /save)
app.post("/save", async (req, res) => {
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
    console.error("Error al guardar:", error);
    res.status(500).json({ error: "Error al guardar", detalle: error.message });
  }
});

// 👉 Ruta GET: obtener todos los cumpleaños
app.get("/cumples", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM cumple");
    res.json(resultado.rows);
  } catch (error) {
    console.error("Error al obtener cumpleaños:", error);
    res.status(500).json({ error: "Error al obtener cumpleaños" });
  }
});

// 👉 Ruta raíz para verificar que el backend funciona
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente 🚀");
});

// 👉 Escuchar en el puerto asignado por Render
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
  console.log("✅ Deploy actualizado, usando process.env.PORT correctamente");
});
