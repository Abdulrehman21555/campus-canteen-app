import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // cart lines look like { id, name, price, emoji, qty }
  const [cart, setCart] = useState([]);
  // favourites is a list of item ids
  const [favourites, setFavourites] = useState([]);

  function addToCart(item, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.id === item.id ? { ...line, qty: line.qty + qty } : line
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, emoji: item.emoji, qty },
      ];
    });
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((line) => (line.id === id ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0)
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((line) => line.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  function toggleFavourite(id) {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // Derived values: always calculated from the cart, never stored separately,
  // so the header count and the cart total can never get out of sync.
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.qty * line.price, 0);

  const value = {
    cart,
    cartCount,
    cartTotal,
    favourites,
    addToCart,
    changeQty,
    removeFromCart,
    clearCart,
    toggleFavourite,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
