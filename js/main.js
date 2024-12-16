document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  if (document.body.classList.contains("index-page")) {
    // Cargar productos desde un archivo JSON
    fetch("./js/productos.json")
      .then((response) => response.json())
      .then((productos) => {
        mostrarProductos(productos);
        actualizarContadorCarrito();
      })
      .catch((error) => console.error("Error al cargar los productos:", error));

    const mostrarProductos = (productos) => {
      const contenedorProductos = document.getElementById("container__imagenes__card");
      contenedorProductos.innerHTML = "";

      productos.forEach((producto) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${producto.img}" alt="${producto.brand}" />
          <h3 class="container__imagenes__card__brand">${producto.brand}</h3>
          <p class="container__imagenes__card__description">${producto.description}</p>
          <p class="container__imagenes__card__precio">$${producto.precio}</p>
          <p class="container__imagenes__card__stock">Stock: ${producto.stock}</p>
          <button id="agregar-${producto.id}" class="container__imagenes__card__boton">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(li);

        // Evento para agregar al carrito
        const boton = document.getElementById(`agregar-${producto.id}`);
        boton.addEventListener("click", () => {
          agregarAlCarrito(productos, producto.id);
          // 
          Swal.fire({
            position: "top-end",
            title: "Excelente eleccion, ve a la seccion del carrito !",
            imageUrl: "./img/img-bicis/gruporutero.jpg",
            imageWidth: 200,
            imageHeight: 200,
            showConfirmButton: false,
            timer: 2500
        })
        });
      });
    };

    const agregarAlCarrito = (productos, id) => {
      const producto = productos.find((producto) => producto.id === id);
      if (!carrito.some((prod) => prod.id === id)) {
        carrito.push({ ...producto, cantidad: 1 });
      } else {
        const productoExistente = carrito.find((prod) => prod.id === id);
        productoExistente.cantidad++;
      }
      localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar en localStorage
      actualizarContadorCarrito();
    };

    const actualizarContadorCarrito = () => {
      const contadorCarrito = document.getElementById("cartQuantity");
      const cantidadTotal = carrito.reduce(
        (acumulador, producto) => acumulador + producto.cantidad,
        0
      );
      contadorCarrito.textContent = cantidadTotal;
    };
  }

  else if (document.body.classList.contains("carrito-page")) {
    mostrarCarrito();

    const mostrarCarrito = () => {
      const contenedorCarrito = document.getElementById("carrito-container");
      contenedorCarrito.innerHTML = "";

      if (carrito.length > 0) {
        const productsCart = document.createElement("ul");
        productsCart.classList.add("productsCart");
        contenedorCarrito.appendChild(productsCart);

        carrito.forEach((producto) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="productContent">
              <h3 class="container__imagenes__card__brand">${producto.brand}</h3>
              <p class="container__imagenes__card__description">${producto.description}</p>
              <p class="container__imagenes__card__precio">$${producto.precio}</p>
              <p class="container__imagenes__card__stock">Stock: ${producto.stock}</p>
              <div class="counter">
                <button id="decrementar-${producto.id}" class="button">-</button>
                <span class="product-price">${producto.cantidad} u.</span>
                <button id="incrementar-${producto.id}" class="button">+</button>
              </div>
            </div>
            <button id="eliminar-${producto.id}" class="remove">Eliminar</button>
          `;
          productsCart.appendChild(li);

          // Eventos para modificar el carrito
          document
            .getElementById(`eliminar-${producto.id}`)
            .addEventListener("click", () => eliminarProducto(producto.id));
          document
            .getElementById(`decrementar-${producto.id}`)
            .addEventListener("click", () => decrementarProducto(producto.id));
          document
            .getElementById(`incrementar-${producto.id}`)
            .addEventListener("click", () => incrementarProducto(producto.id));
        });
        actualizarTotalCompra();
      } else {
        contenedorCarrito.innerHTML = '<span class="mensaje-carrito">No hay productos en el carrito</span>';

        actualizarTotalCompra();
      }
    };

    const eliminarProducto = (id) => {
      const index = carrito.findIndex((prod) => prod.id === id);
      if (index !== -1) carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    };

    const decrementarProducto = (id) => {
      const producto = carrito.find((prod) => prod.id === id);
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        eliminarProducto(id);
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    };

    const incrementarProducto = (id) => {
      const producto = carrito.find((prod) => prod.id === id);
      producto.cantidad++;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    };

    const actualizarTotalCompra = () => {
      const totalCompraElement = document.getElementById("total-compra");
      const total = carrito.reduce(
        (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
        0
      );
      totalCompraElement.textContent = total.toFixed(2);
    };
  }
});


