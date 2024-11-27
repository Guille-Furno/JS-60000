import { getCartItems } from "./cart.js";

const products = [
  {
    id: 1,
    title: "Producto 1",
    price: 200.0,
    image:
      "./koala.jpg",
  },
  {
    id: 2,
    title: "Producto 1",
    price: 500.0,
    image:
    "./koala.jpg",
  },
  {
    id: 3,
    title: "Producto 3",
    price: 120.0,
    image:
    "./koala.jpg",
  },
  {
    id: 4,
    title: "Producto 4",
    price: 11000.0,
    image:
    "./koala.jpg",
  },
  {
    id: 5,
    title: "Producto 5",
    price: 4500.0,
    image:
    "./koala.jpg",
  },
  {
    id: 6,
    title: "Producto 6",
    price: 123330.0,
    image:
    "./koala.jpg",
  },
];

export const renderProducts = () => {
  const productList = document.getElementById("productList");

  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product");
    productCard.setAttribute("data-id", product.id);

    productCard.innerHTML = `
      <div>
        <img class="product__image" src="${product.image}" alt="${
      product.title
    }" />
      </div>
      <div>
        <h5 class="product__title">${product.title}</h5>
        <p class="product__price">$${product.price.toFixed(2)}</p>
      </div>
      <button class="product__add">Agregar</button>
    `;

    productList.append(productCard);
  });
};

export const updateCartUi = () => {
  const cartContainer = document.querySelector(".cart__container");
  const cartTotalPrice = document.querySelector(".cart__totalPrice");

  cartContainer.innerHTML = ""; // Limpiar la UI del carrito antes de renderizar

  // Obtener los productos actuales en el carrito desde localStorage
  const cartItemsList = getCartItems();

  if (cartItemsList.length === 0) {
    cartTotalPrice.innerHTML = "El carrito está vacío.";
    return;
  }

  cartItemsList.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart__item");
    cartItem.setAttribute("data-id", item.id);

    cartItem.innerHTML = `
      <div class="cart__item-title">${item.title}</div>
      <div>${item.price}</div>
      <div>
        <span>Cantidad: ${item.quantity}</span>
        <button class="cart__increase">+</button>
        <button class="cart__decrease">-</button>
        <button class="cart__remove">Eliminar</button>
      </div>
    `;

    cartContainer.appendChild(cartItem);

    // Evento para aumentar la cantidad
    const increaseBtn = cartItem.querySelector(".cart__increase");
    increaseBtn.addEventListener("click", () => {
      increaseQuantity(item.id); // Llama a la función para aumentar la cantidad
    });

    // Evento para disminuir la cantidad
    const decreaseBtn = cartItem.querySelector(".cart__decrease");
    decreaseBtn.addEventListener("click", () => {
      decreaseQuantity(item.id); // Llama a la función para disminuir la cantidad
    });

    // Evento para eliminar el producto
    const removeBtn = cartItem.querySelector(".cart__remove");
    removeBtn.addEventListener("click", () => {
      removeFromCart(item.id); // Llama a la función para eliminar el producto
      updateCartUi(); // Vuelve a actualizar la UI después de eliminar
    });
  });

  const total = cartItemsList.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price);
    const itemQuantity = parseInt(item.quantity, 10);
    
    if (isNaN(itemPrice) || isNaN(itemQuantity)) {
      console.log("¡Error! Precio o cantidad no válida.");
      return acc;
    }

    return acc + itemPrice * itemQuantity;
  }, 0);

  if (!isNaN(total)) {
    cartTotalPrice.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    cartTotalPrice.innerHTML = "Total no disponible.";
  }
};


// Función para aumentar la cantidad de un producto en el carrito
const increaseQuantity = (id) => {
  const cartItemsList = getCartItems();
  const item = cartItemsList.find((item) => item.id === id);

  if (item) {
    // Aumentar la cantidad del producto
    item.quantity += 1;
  }

  // Volver a renderizar el carrito después de la actualización
  updateCartUi();
};

// Función para disminuir la cantidad de un producto
const decreaseQuantity = (id) => {
  const cartItemsList = getCartItems();
  const item = cartItemsList.find((item) => item.id === id);

  if (item && item.quantity > 1) {
    // Disminuir la cantidad, pero no permitir que sea menor que 1
    item.quantity -= 1;
  }

  // Volver a renderizar el carrito después de la actualización
  updateCartUi();
};

// Función para agregar un producto al carrito
export const addToCart = (product, quantity) => {
  const existsInTheCart = cartItems.find((item) => item.id === product.id);

  if (existsInTheCart) {
    existsInTheCart.quantity += quantity;
  } else {
    cartItems.push({ ...product, quantity });
  }

  // Guardar el carrito en localStorage después de actualizarlo
  saveCartToLocalStorage();

  // Actualizar la UI del carrito
  updateCartUi();
};


export const removeFromCart = (id) => {
  cartItems = cartItems.filter((item) => item.id !== id);

  // Guardar el carrito en localStorage después de eliminar el producto
  saveCartToLocalStorage();

  // Actualizar la UI del carrito
  updateCartUi();
};