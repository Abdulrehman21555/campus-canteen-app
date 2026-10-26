import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span aria-hidden="true">🍽️</span> Campus Canteen
      </Link>
      <nav aria-label="Main navigation" className="nav">
        <NavLink to="/" end>Menu</NavLink>
        <NavLink to="/cart" className="cart-link">
          Cart
          <span className="badge" aria-live="polite" aria-label={`${cartCount} items in cart`}>
            {cartCount}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}
