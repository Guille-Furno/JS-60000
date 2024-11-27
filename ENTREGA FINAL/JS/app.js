import { addToCart, createProduct, removeFromCart, clearCart  } from "./cart.js";
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
  cartOpenButton.classList.add("hidden");
});

cartCloseButton.addEventListener("click", () => {
  cartSidebar.classList.remove("cart__sidebar--open");
  cartOpenButton.classList.remove("hidden");
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

    event.target.disabled = true;
    event.target.textContent = "En el carrito";
  }
});

document.querySelector(".cart__container").addEventListener("click", (event) => {
  const cartItemsString = localStorage.getItem('cartItems');
  const cartItems = JSON.parse(cartItemsString);
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