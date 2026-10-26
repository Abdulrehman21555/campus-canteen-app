import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice.js";

export default function ItemCard({
  item,
  currency,
  isFavourite,
  onToggleFavourite,
  onAdd,
}) {
  return (
    <article className="card">
      <Link to={`/item/${item.id}`} className="card-link">
        <div className="card-emoji" aria-hidden="true">{item.emoji}</div>
        <h3>{item.name}</h3>
        <p className="muted">
          {item.category} &middot; {item.veg ? "Veg" : "Non-veg"}
        </p>
      </Link>

      <div className="card-footer">
        <strong>{formatPrice(currency, item.price)}</strong>
        <div className="card-actions">
          <button
            type="button"
            className={`icon-btn ${isFavourite ? "is-fav" : ""}`}
            onClick={() => onToggleFavourite(item.id)}
            aria-pressed={isFavourite}
            aria-label={
              isFavourite
                ? `Remove ${item.name} from favourites`
                : `Add ${item.name} to favourites`
            }
          >
            {isFavourite ? "♥" : "♡"}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => onAdd(item)}
            aria-label={`Add ${item.name} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
