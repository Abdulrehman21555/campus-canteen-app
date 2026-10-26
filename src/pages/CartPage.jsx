import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../components/Cart.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useMenu } from "../context/MenuContext.jsx";

export default function CartPage() {
  const { cart, cartTotal, changeQty, removeFromCart, clearCart } = useCart();
  const { menu } = useMenu();
  const [orderNumber, setOrderNumber] = useState(null);

  function placeOrder() {
    setOrderNumber(Math.floor(1000 + Math.random() * 9000));
    clearCart();
  }

  if (orderNumber) {
    return (
      <div className="panel" role="status">
        <h1>Order placed</h1>
        <p>
          Thank you! Your order number is <strong>#{orderNumber}</strong>.
          Please collect it from the counter.
        </p>
        <Link className="btn" to="/" onClick={() => setOrderNumber(null)}>
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <section aria-labelledby="cart-heading">
      <h1 id="cart-heading">Your cart</h1>
      <Cart
        lines={cart}
        currency={menu.currency}
        total={cartTotal}
        onIncrease={(id) => changeQty(id, 1)}
        onDecrease={(id) => changeQty(id, -1)}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={placeOrder}
      />
    </section>
  );
}
