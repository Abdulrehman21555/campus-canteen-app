import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice.js";

export default function Cart({
  lines,
  currency,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
  onCheckout,
}) {
  if (lines.length === 0) {
    return (
      <div className="panel empty-cart">
        <p>Your cart is empty.</p>
        <Link className="btn" to="/">Browse the menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <ul className="cart-lines">
        {lines.map((line) => (
          <li key={line.id} className="cart-line">
            <span className="cart-emoji" aria-hidden="true">{line.emoji}</span>
            <div className="cart-info">
              <strong>{line.name}</strong>
              <span className="muted">{formatPrice(currency, line.price)} each</span>
            </div>
            <div className="qty" role="group" aria-label={`Quantity of ${line.name}`}>
              <button type="button" onClick={() => onDecrease(line.id)} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{line.qty}</span>
              <button type="button" onClick={() => onIncrease(line.id)} aria-label="Increase quantity">+</button>
            </div>
            <strong className="line-total">
              {formatPrice(currency, line.price * line.qty)}
            </strong>
            <button
              type="button"
              className="link-btn"
              onClick={() => onRemove(line.id)}
              aria-label={`Remove ${line.name}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <aside className="summary panel" aria-label="Order summary">
        <h2>Order summary</h2>
        <p className="summary-row">
          <span>Total</span>
          <strong>{formatPrice(currency, total)}</strong>
        </p>
        <button type="button" className="btn btn-block" onClick={onCheckout}>
          Place order
        </button>
        <button type="button" className="link-btn" onClick={onClear}>
          Clear cart
        </button>
      </aside>
    </div>
  );
}
