// dbTest.js
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false }, // Neon requiere SSL
});

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Conexión exitosa. Hora DB:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Error de conexión:", err.message);
  } finally {
    await pool.end(); // asegúrate de esperar el cierre
  }
}

testConnection();