let cartItems = [];

// Cargar el carrito desde Local Storage al inicio
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCartTotal(); // Actualiza el total cuando se carga el carrito
  }
};

// Guardar el carrito en Local Storage
const saveCartToLocalStorage = () => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const createProduct = (id, title, price) => ({ id, title, price });

export const getCartItems = () => {
  return [...cartItems];
};

export const addToCart = (product, quantity) => {
  const existsInTheCart = cartItems.find((item) => item.id === product.id);

  if (existsInTheCart) {
    existsInTheCart.quantity += quantity;
  } else {
    cartItems.push({ ...product, quantity });
  }

  saveCartToLocalStorage(); // Guarda el carrito en Local Storage cada vez que cambia
  updateCartTotal(); // Actualiza el total
};

export const removeFromCart = (id) => {
  cartItems = cartItems.filter((item) => item.id !== id);
  
  saveCartToLocalStorage(); // Guarda el carrito en Local Storage cada vez que cambia
  updateCartTotal(); // Actualiza el total
};

// Calcula el total del carrito
export const getCartTotal = () => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Actualiza el total en el HTML
const updateCartTotal = () => {
  const totalPriceElement = document.getElementById("totalPrice");
  if (totalPriceElement) {
    const total = getCartTotal();
    totalPriceElement.textContent = total.toFixed(2); // Actualiza el total en el HTML con 2 decimales
  }
};
