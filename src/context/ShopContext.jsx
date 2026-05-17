import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { products } from "../data/products";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("pastelnest-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Keep Tailwind dark mode in sync with app state.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Persist fake frontend authentication so refreshes keep the user logged in.
  useEffect(() => {
    if (user) {
      localStorage.setItem("pastelnest-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("pastelnest-user");
    }
  }, [user]);

  const showToast = useCallback((message) => {
    toast(message, {
      duration: 2400,
      style: {
        background: darkMode ? "#2d2638" : "#fff8f0",
        border: darkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,214,232,0.8)",
        color: darkMode ? "#fff7fb" : "#34313f",
        fontWeight: 800,
        borderRadius: "999px"
      }
    });
  }, [darkMode]);

  const redirectToLogin = useCallback((message = "Please login first") => {
    showToast(message);
    window.setTimeout(() => {
      window.location.href = "/login";
    }, 450);
  }, [showToast]);

  const isLoggedIn = Boolean(user);
  const role = user?.role || null;
  const isCustomer = isLoggedIn && role === "customer";
  const isSeller = isLoggedIn && role === "seller";

  const addToCart = (product, quantity = 1) => {
    if (!isCustomer) {
      redirectToLogin("Please register before purchasing");
      return false;
    }
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...items, { ...product, quantity }];
    });
    showToast(`${product.title} added to cart`);
    return true;
  };

  const removeFromCart = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
    showToast("Item removed from cart");
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCart((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const toggleWishlist = (product) => {
    if (!isCustomer) {
      redirectToLogin("Login required to continue");
      return false;
    }
    setWishlist((items) => {
      const exists = items.some((item) => item.id === product.id);
      showToast(exists ? "Removed from wishlist" : "Added to wishlist");
      return exists ? items.filter((item) => item.id !== product.id) : [...items, product];
    });
    return true;
  };

  const addRecentlyViewed = useCallback((product) => {
    setRecentlyViewed((items) => [product, ...items.filter((item) => item.id !== product.id)].slice(0, 4));
  }, []);

  // Fake authentication helpers keep this project frontend-only.
  const login = ({ email, role = "customer" }) => {
    const name = email?.split("@")[0] || (role === "seller" ? "Seller" : "Customer");
    setUser({ name, email, role });
    showToast(`${role === "seller" ? "Seller" : "Customer"} login successful`);
  };

  const register = ({ name, email, role = "customer" }) => {
    setUser({ name, email, role });
    showToast(`${role === "seller" ? "Seller" : "Customer"} account created`);
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
    showToast("Logged out successfully");
  };

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const value = {
    products,
    cart,
    wishlist,
    darkMode,
    user,
    role,
    isLoggedIn,
    isCustomer,
    isSeller,
    isAuthenticated: isLoggedIn,
    recentlyViewed,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    setDarkMode,
    showToast,
    redirectToLogin,
    addRecentlyViewed,
    login,
    register,
    logout
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}
