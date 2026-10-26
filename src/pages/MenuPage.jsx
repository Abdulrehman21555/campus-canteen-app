import { useMemo, useState } from "react";
import MenuList from "../components/MenuList.jsx";
import { useMenu } from "../context/MenuContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function MenuPage() {
  const { menu, loading, error, reload } = useMenu();
  const { favourites, toggleFavourite, addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  const categories = useMemo(
    () => ["All", ...new Set(menu.items.map((item) => item.category))],
    [menu.items]
  );

  const visibleItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return menu.items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSearch =
        term === "" ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term);
      const matchesFavourite = !favouritesOnly || favourites.includes(item.id);
      return matchesCategory && matchesSearch && matchesFavourite;
    });
  }, [menu.items, search, category, favouritesOnly, favourites]);

  const dateLabel = menu.menuDate
    ? new Date(`${menu.menuDate}T00:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  if (loading) {
    return <p className="status" role="status">Loading the menu...</p>;
  }

  if (error) {
    return (
      <div className="panel error" role="alert">
        <p>Could not load the menu: {error}</p>
        <button type="button" className="btn" onClick={reload}>Try again</button>
      </div>
    );
  }

  return (
    <section aria-labelledby="menu-heading">
      <div className="page-head">
        <h1 id="menu-heading">Today&apos;s menu</h1>
        {dateLabel && <p className="muted">{dateLabel}</p>}
      </div>

      <div className="filters">
        <label className="search">
          <span className="sr-only">Search the menu</span>
          <input
            type="search"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <div className="chips" role="group" aria-label="Filter by category">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              className={`chip ${category === name ? "active" : ""}`}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <label className="check">
          <input
            type="checkbox"
            checked={favouritesOnly}
            onChange={(e) => setFavouritesOnly(e.target.checked)}
          />
          Favourites only
        </label>
      </div>

      <p className="muted" aria-live="polite">
        Showing {visibleItems.length} of {menu.items.length} items
      </p>

      <MenuList
        items={visibleItems}
        currency={menu.currency}
        favourites={favourites}
        onToggleFavourite={toggleFavourite}
        onAdd={addToCart}
      />
    </section>
  );
}
