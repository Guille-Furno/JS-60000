import { addToCart, createProduct, removeFromCart } from "./cart.js";
import { renderProducts, updateCartUi } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUi();
});

const cartOpenButton = document.querySelector(".cart__openButton");
const cartSidebar = document.querySelector(".cart__sidebar");
const cartCloseButton = document.querySelector(".cart__close");

cartOpenButton.addEventListener("click", () => {
  cartSidebar.classList.add("cart__sidebar--open");
});

cartCloseButton.addEventListener("click", () => {
  cartSidebar.classList.remove("cart__sidebar--open");
});

document.getElementById("productList").addEventListener("click", (event) => {
  if (event.target.classList.contains("product__add")) {
    const card = event.target.closest(".product");
    const productTitle = card.querySelector(".product__title").innerText;
    const productPrice = card.querySelector(".product__price").innerText;
    const productId = card.getAttribute("data-id");

    const product = createProduct(productId, productTitle, productPrice);

    addToCart(product, 1);  
    updateCartUi();  
  }
});

document.querySelector(".cart__container").addEventListener("click", (event) => {
  if (event.target.classList.contains("cart__remove")) {
    const productId = event.target
      .closest(".cart__item")
      .getAttribute("data-id");

    removeFromCart(productId);  
    updateCartUi(); 
  }

    if (event.target.classList.contains("cart__increase")) {
    const productId = event.target
      .closest(".cart__item")
      .getAttribute("data-id");

    const product = cartItems.find(item => item.id === productId);
    if (product) {
      addToCart({ id: productId, title: product.title, price: product.price }, 1);  
      updateCartUi();  
    }
  }


  if (event.target.classList.contains("cart__decrease")) {
    const productId = event.target
      .closest(".cart__item")
      .getAttribute("data-id");

    const product = cartItems.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      addToCart({ id: productId, title: product.title, price: product.price }, -1); 
      updateCartUi();  
    }
  }
});

// Función para guardar el carrito en localStorage
const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cartItems)); // Convierte el carrito en un string JSON
};

// Función para cargar el carrito desde localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    cartItems = JSON.parse(cartData); // Convierte el string JSON de nuevo a un objeto
  }
};

// Llamar a la función para cargar los productos del carrito al inicio
loadCartFromLocalStorage();