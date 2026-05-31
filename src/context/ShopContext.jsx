import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { categories, products } from "../data/products";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sellerProducts, setSellerProducts] = useState(() => JSON.parse(localStorage.getItem("akriti-seller-products") || "[]"));
  const [sellerCategories, setSellerCategories] = useState(() => JSON.parse(localStorage.getItem("akriti-seller-categories") || "[]"));
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem("akriti-reviews") || "{}"));
  const [orders] = useState(() => JSON.parse(localStorage.getItem("akriti-orders") || JSON.stringify([
    { id: "AK-1008", productId: 3, status: "Shipped", payment: "UPI", expectedDelivery: "27 May 2026" },
    { id: "AK-0996", productId: 6, status: "Delivered", payment: "Card", deliveredAt: "15 May 2026" }
  ])));
  const [darkMode, setDarkMode] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("akriti-notifications");
    return saved ? JSON.parse(saved) : [
      { id: "n1", role: "customer", text: "Welcome to Akriti. Track handmade orders here.", read: false },
      { id: "n2", role: "seller", text: "New order notifications will appear in your seller studio.", read: false }
    ];
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("akriti-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Keep Tailwind dark mode in sync with app state.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Persist fake frontend authentication so refreshes keep the user logged in.
  useEffect(() => {
    if (user) {
      localStorage.setItem("akriti-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("akriti-user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("akriti-notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("akriti-seller-products", JSON.stringify(sellerProducts));
  }, [sellerProducts]);

  useEffect(() => {
    localStorage.setItem("akriti-seller-categories", JSON.stringify(sellerCategories));
  }, [sellerCategories]);

  useEffect(() => {
    localStorage.setItem("akriti-reviews", JSON.stringify(reviews));
  }, [reviews]);

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

  const getAccounts = () => JSON.parse(localStorage.getItem("akriti-accounts") || "[]");
  const saveAccounts = (accounts) => localStorage.setItem("akriti-accounts", JSON.stringify(accounts));
  const getPendingOtps = () => JSON.parse(localStorage.getItem("akriti-pending-otps") || "{}");
  const savePendingOtps = (otps) => localStorage.setItem("akriti-pending-otps", JSON.stringify(otps));

  const addNotification = (role, text) => {
    setNotifications((items) => [{ id: `n-${Date.now()}`, role, text, read: false }, ...items].slice(0, 12));
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
  const login = ({ email, phone, password, role = "customer" }) => {
    const accounts = getAccounts();
    const account = accounts.find((item) =>
      item.role === role &&
      (item.email?.toLowerCase() === email?.toLowerCase() || item.phone === phone) &&
      (!password || item.password === password)
    );
    if (!account && accounts.length) {
      showToast("No matching account found");
      return false;
    }
    const name = account?.name || email?.split("@")[0] || (role === "seller" ? "Seller" : "Customer");
    setUser({ ...account, name, email: account?.email || email, phone: account?.phone || phone, role });
    showToast(`${role === "seller" ? "Seller" : "Customer"} login successful`);
    return true;
  };

  const requestOtp = (account) => {
    const role = account.role || "customer";
    const accounts = getAccounts();
    const emailExists = accounts.some((item) => item.email?.toLowerCase() === account.email?.toLowerCase());
    const phoneExists = accounts.some((item) => item.phone === account.phone);
    if (emailExists || phoneExists) {
      showToast(emailExists ? "Email already registered" : "Mobile number already registered");
      return null;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const key = account.email?.toLowerCase() || account.phone;
    const pending = getPendingOtps();
    pending[key] = { account: { ...account, role }, code, expiresAt: Date.now() + 5 * 60 * 1000 };
    savePendingOtps(pending);
    showToast(`OTP sent: ${code}`);
    return code;
  };

  const verifyOtpAndRegister = ({ email, phone, otp }) => {
    const key = email?.toLowerCase() || phone;
    const pending = getPendingOtps();
    const entry = pending[key];
    if (!entry) {
      showToast("Please request OTP first");
      return false;
    }
    if (Date.now() > entry.expiresAt) {
      delete pending[key];
      savePendingOtps(pending);
      showToast("OTP expired. Please resend OTP");
      return false;
    }
    if (entry.code !== otp) {
      showToast("Invalid OTP");
      return false;
    }
    delete pending[key];
    savePendingOtps(pending);
    return register(entry.account);
  };

  const register = (account) => {
    const role = account.role || "customer";
    const accounts = getAccounts();
    const emailExists = accounts.some((item) => item.email?.toLowerCase() === account.email?.toLowerCase());
    const phoneExists = accounts.some((item) => item.phone === account.phone);
    if (emailExists || phoneExists) {
      showToast(emailExists ? "Email already registered" : "Mobile number already registered");
      return false;
    }
    const savedAccount = { ...account, role, id: `acc-${Date.now()}` };
    saveAccounts([...accounts, savedAccount]);
    setUser(savedAccount);
    showToast(`${role === "seller" ? "Seller" : "Customer"} account created`);
    addNotification(role, role === "seller" ? "Seller store registered successfully" : "Customer account created successfully");
    return true;
  };

  const addSellerCategory = ({ name, description }) => {
    const normalized = name.trim().toLowerCase();
    if (!normalized) {
      showToast("Category name is required");
      return false;
    }
    if ([...sellerCategories, ...products.map((product) => ({ name: product.category }))].some((item) => item.name === normalized || item === normalized)) {
      showToast("Category already exists");
      return false;
    }
    setSellerCategories((items) => [...items, { id: `cat-${Date.now()}`, name: normalized, description }]);
    showToast("Category created");
    return true;
  };

  const addSellerProduct = (product) => {
    const savedProduct = {
      ...product,
      id: `seller-${Date.now()}`,
      price: Number(product.price || product.basePrice || 0),
      rating: 0,
      reviews: [],
      trend: false,
      discount: Number(product.discount || 0)
    };
    setSellerProducts((items) => [savedProduct, ...items]);
    addNotification("seller", `${product.title} saved as a seller product`);
    showToast("Product saved successfully");
    return savedProduct;
  };

  const addReview = ({ productId, rating, text }) => {
    const delivered = orders.some((order) => Number(order.productId) === Number(productId) && order.status === "Delivered");
    if (!delivered) {
      showToast("Reviews are available after successful delivery");
      return false;
    }
    const review = { user: user?.name || "Customer", rating: Number(rating), text, createdAt: new Date().toISOString() };
    setReviews((items) => ({ ...items, [productId]: [review, ...(items[productId] || [])] }));
    showToast("Thanks for your feedback");
    return true;
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
    products: [...sellerProducts, ...products],
    baseProducts: products,
    categories: [...new Set([...categories, ...sellerCategories.map((category) => category.name)])],
    sellerCategories,
    sellerProducts,
    reviews,
    orders,
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
    requestOtp,
    verifyOtpAndRegister,
    logout,
    notifications,
    addNotification,
    addSellerCategory,
    addSellerProduct,
    addReview
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}


export function useShop() {
  return useContext(ShopContext);
}
