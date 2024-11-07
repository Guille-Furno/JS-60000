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
  
    cartContainer.innerHTML = ""; 
  
    const cartItemsList = getCartItems();
  
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
    });
  

    const total = cartItemsList.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalPrice.innerHTML = `Total: $${total.toFixed(2)}`;
  };