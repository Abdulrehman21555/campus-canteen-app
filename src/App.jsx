import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import CartPage from "./pages/CartPage.jsx";

function NotFound() {
  return (
    <section className="panel">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="btn" to="/">Back to menu</Link>
    </section>
  );
}

export default function App() {
  return (
    <>
      {/* Header sits outside <Routes>, so it is shown on every screen */}
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <p>Campus Canteen &copy; 2026. Order ahead, skip the queue.</p>
      </footer>
    </>
  );
}
