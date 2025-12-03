document.getElementById("formCumple").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;

  try {
    const res = await fetch("https://cumpleapp-backend.onrender.com/cumples", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, fecha })
    });

    if (res.ok) {
      alert("Cumpleaños guardado con éxito");
      document.getElementById("formCumple").reset();
    } else {
      alert("Error al guardar");
    }
  } catch (error) {
    console.error("Error en el fetch:", error);
    alert("Error al conectar con el servidor");
  }
});