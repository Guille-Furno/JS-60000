let cartItems = [];

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

  saveCartToLocalStorage(); 

  Toastify({
    text: `${product.title} agregado al carrito`,
    duration: 3000, 
    gravity: "top", 
    position: "right", 
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "#fff",
    },
    close: true, 
  }).showToast();
};


export const removeFromCart = (id) => {
  cartItems = cartItems.filter((item) => item.id !== id);
  saveCartToLocalStorage();
};

const saveCartToLocalStorage = () => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const clearCart = () => {
  cartItems = [];
  saveCartToLocalStorage(); 
};

export const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
  }
};