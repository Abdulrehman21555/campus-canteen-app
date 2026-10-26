import ItemCard from "./ItemCard.jsx";

export default function MenuList({
  items,
  currency,
  favourites,
  onToggleFavourite,
  onAdd,
}) {
  if (items.length === 0) {
    return <p className="status">No items match your search. Try another filter.</p>;
  }

  return (
    <ul className="menu-grid">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard
            item={item}
            currency={currency}
            isFavourite={favourites.includes(item.id)}
            onToggleFavourite={onToggleFavourite}
            onAdd={onAdd}
          />
        </li>
      ))}
    </ul>
  );
}
