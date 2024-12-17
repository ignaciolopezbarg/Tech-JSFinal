document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-container");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const nombre = document.querySelector("input[name='full_name']").value;

      const tarjeta = document.querySelector(
        "input[name='Tarjeta Credito']"
      ).value;
      const mes = document.querySelector("input[name='Mes']").value;
      const anio = document.querySelector("input[name='Año']").value;

      // Generar un número aleatorio como ID
      const randomId = Math.floor(Math.random() * 1000) + 1;

      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Compra efectuada Exitosamente!",
        html: `
            <p><strong>ID:</strong> ${randomId}</p>
            <p><strong>Nombre Completo:</strong> ${nombre}</p>
            <p><strong>Tarjeta de Crédito:</strong> **** **** **** ${tarjeta.slice(
              -4
            )}</p>
            <p><strong>Vencimiento:</strong> ${mes}/${anio}</p>
          `,
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Por favor, completa todos los campos correctamente.",
        showConfirmButton: true,
      });
    }
  });
});
