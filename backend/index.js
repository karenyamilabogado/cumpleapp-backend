import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente 🚀");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});