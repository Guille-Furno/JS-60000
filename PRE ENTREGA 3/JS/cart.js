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
};

export const removeFromCart = (id) => {
cartItems = cartItems.filter((item) => item.id !== id);
};