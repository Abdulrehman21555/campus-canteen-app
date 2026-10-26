import { createContext, useContext, useEffect, useState } from "react";

const MenuContext = createContext(null);

const EMPTY_MENU = { canteen: "", menuDate: "", currency: "$", items: [] };

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState(EMPTY_MENU);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false; // stops a late response from updating an unmounted app

    async function loadMenu() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`${import.meta.env.BASE_URL}menu.json`);
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data.items)) {
          throw new Error("menu.json is missing the items list");
        }
        if (!ignore) setMenu(data);
      } catch (err) {
        if (!ignore) setError(err.message || "Something went wrong");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadMenu();
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  return (
    <MenuContext.Provider value={{ menu, loading, error, reload }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used inside <MenuProvider>");
  return context;
}
