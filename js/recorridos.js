const mostrarRecorridos = (recorridos) => {
  // Verificar si el contenedor existe
  let contenedorRecorridos = document.querySelector(".recorridos");

  if (!contenedorRecorridos) {
    console.error("El contenedor '.recorridos' no existe.");
    return;
  }

  console.log("Datos de recorridos:", recorridos);

  contenedorRecorridos.innerHTML = "";

  recorridos.forEach((recorrido) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <h3 class="recorridos__lugar">${recorrido.destino}</h3>
            <p class="recorridos__descripcion">${recorrido.descripcion}</p>
            <p class="recorridos__descripcion">Dificultad: ${recorrido.dificultad}</p>
            <span class="recorridos__precio">Costo total: $${recorrido.costo_total}</span>
            <p class="recorridos__fechas">Próximas salidas: ${recorrido.proximas_salidas}</p>
            <button class="recorridos__boton">PROXIMAMENTE</button>
        `;

    contenedorRecorridos.appendChild(li);
  });

  const botonesRecorridos = document.querySelectorAll(".recorridos__boton");
  botonesRecorridos.forEach((boton) => {
    boton.addEventListener("click", () => {
        Swal.fire({
            position: "center",
            title: "Habilitaremos reservas desde 15/1/2025 !",
            showConfirmButton: true,
            timer: 4500
        })
    });
  });
};

fetch("./js/recorridos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la respuesta de la red");
    }
    return response.json();
  })
  .then((recorridos) => {
    mostrarRecorridos(recorridos);
  })
  .catch((error) => {
    console.error("Error al cargar los recorridos:", error);
  });
