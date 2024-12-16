document.addEventListener("DOMContentLoaded", () => {
    // Recuperar carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Mostrar los productos en el carrito
    const mostrarCarrito = () => {
      const contenedorCarrito = document.getElementById("carrito-container");
      contenedorCarrito.innerHTML = ""; 
  
      if (carrito.length > 0) {
        const productosCarrito = document.createElement("ul");
        productosCarrito.classList.add("productsCart");
        contenedorCarrito.appendChild(productosCarrito);
  
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
          productosCarrito.appendChild(li);
  
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
        contenedorCarrito.innerHTML = "<p>No hay productos en el carrito</p>";
        actualizarTotalCompra();
      }
    };
  
    // Eliminar producto del carrito
    const eliminarProducto = (id) => {
      const index = carrito.findIndex((prod) => prod.id === id);
      if (index !== -1) carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    };
  
    // Decrementar cantidad de un producto
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
  
    // Incrementar cantidad de un producto
    const incrementarProducto = (id) => {
      const producto = carrito.find((prod) => prod.id === id);
      producto.cantidad++;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    };
  
    // Actualizar el total de la compra
    const actualizarTotalCompra = () => {
      const totalCompraElement = document.getElementById("total-compra");
      const total = carrito.reduce(
        (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
        0
      );
      totalCompraElement.textContent = total.toFixed(2);
    };
  
    mostrarCarrito();
  });
  