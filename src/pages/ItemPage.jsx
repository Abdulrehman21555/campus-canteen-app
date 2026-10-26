import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMenu } from "../context/MenuContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/formatPrice.js";

export default function ItemPage() {
  const { id } = useParams();
  const { menu, loading, error, reload } = useMenu();
  const { favourites, toggleFavourite, addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) {
    return <p className="status" role="status">Loading the item...</p>;
  }

  if (error) {
    return (
      <div className="panel error" role="alert">
        <p>Could not load the menu: {error}</p>
        <button type="button" className="btn" onClick={reload}>Try again</button>
      </div>
    );
  }

  const item = menu.items.find((entry) => entry.id === Number(id));

  if (!item) {
    return (
      <div className="panel">
        <h1>Item not found</h1>
        <p>This dish is not on today&apos;s menu.</p>
        <Link className="btn" to="/">Back to menu</Link>
      </div>
    );
  }

  const isFavourite = favourites.includes(item.id);

  function handleAdd() {
    addToCart(item, qty);
    setAdded(true);
  }

  return (
    <article className="detail">
      <Link to="/" className="back-link">&larr; Back to menu</Link>

      <div className="detail-grid">
        <div className="detail-emoji" aria-hidden="true">{item.emoji}</div>

        <div className="detail-body">
          <h1>{item.name}</h1>
          <p className="muted">
            {item.category} &middot; {item.veg ? "Vegetarian" : "Non-vegetarian"}{" "}
            &middot; {item.calories} kcal
          </p>
          <p>{item.description}</p>
          <p className="price">{formatPrice(menu.currency, item.price)}</p>

          <div className="detail-actions">
            <div className="qty" role="group" aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span aria-live="polite">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button type="button" className="btn" onClick={handleAdd}>
              Add to cart
            </button>

            <button
              type="button"
              className={`icon-btn ${isFavourite ? "is-fav" : ""}`}
              onClick={() => toggleFavourite(item.id)}
              aria-pressed={isFavourite}
              aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
              {isFavourite ? "♥" : "♡"}
            </button>
          </div>

          {added && (
            <p className="notice" role="status">
              Added to your cart. <Link to="/cart">View cart</Link>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
