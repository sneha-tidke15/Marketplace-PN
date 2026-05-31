import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiHeart, FiLogOut, FiMenu, FiMoon, FiShoppingBag, FiSun, FiUser, FiX } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart, wishlist, darkMode, setDarkMode, user, logout, isCustomer, isSeller } = useShop();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-bold transition ${isActive ? "bg-pastelPink text-ink" : "text-ink hover:bg-white/70 dark:text-white dark:hover:bg-white/10"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-rose-100 bg-[#fff8f0] shadow-sm dark:border-white/10 dark:bg-[#201c2a]">
      <nav className="container-soft flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pink-100 via-[#ffe8c7] to-blue-100 text-[#7a4b5a] text-xl font-extrabold shadow-md border border-white/50">
  AK
</span>
          <span>
            <span className="block text-xl font-black leading-none">Akriti</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => <NavLink key={link.to} to={link.to} className={linkClass}>{link.label}</NavLink>)}
          {isSeller && <NavLink to="/seller-dashboard" className={linkClass}>Seller Dashboard</NavLink>}
        </div>

        <div className="flex items-center gap-2">
          <button title="Toggle dark mode" onClick={() => setDarkMode(!darkMode)} className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm dark:bg-white/10 dark:text-white" aria-label="Toggle dark mode">
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <div className="hidden items-center gap-2 lg:flex">
            {!user ? (
              <>
                <Link to="/login" className="pill-button bg-white px-4 py-2 text-ink shadow-sm hover:bg-pastelPink dark:bg-white/10 dark:text-white">Login</Link>
                <Link to="/register" className="pill-button bg-white px-4 py-2 text-ink shadow-sm hover:bg-pastelBlue dark:bg-white/10 dark:text-white">Register</Link>
                <Link to="/seller-register" className="pill-button bg-gradient-to-r from-pastelPink to-pastelBlue px-4 py-2 text-ink shadow-sm hover:scale-105">Become a Seller</Link>
              </>
            ) : (
              <>
                <Link to={user.role === "seller" ? "/seller-dashboard" : "/customer-dashboard"} className="pill-button bg-white/70 px-4 py-2 text-ink shadow-sm dark:bg-white/10 dark:text-white">
                  <FiUser /> {user.role === "seller" ? "Seller" : "Customer"}
                </Link>
                <button title="Logout" onClick={logout} className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm dark:bg-white/10 dark:text-white" aria-label="Logout"><FiLogOut /></button>
              </>
            )}
          </div>
          {user && <Link title="Account dashboard" to={user.role === "seller" ? "/seller-dashboard" : "/customer-dashboard"} className="hidden h-11 w-11 place-items-center rounded-full bg-white shadow-sm dark:bg-white/10 dark:text-white sm:grid lg:hidden" aria-label="Account dashboard"><FiUser /></Link>}
          {isCustomer && (
            <Link title="View Wishlist" to="/account/wishlist" className="relative hidden h-11 w-11 place-items-center rounded-full bg-white shadow-sm dark:bg-white/10 dark:text-white sm:grid" aria-label="Wishlist">
              <FiHeart />
              {wishlist.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-black text-white">{wishlist.length}</span>}
            </Link>
          )}
          <Link title="Go to Cart" to="/cart" className="relative grid h-11 w-11 place-items-center rounded-full bg-ink text-white shadow-sm dark:bg-pastelPink dark:text-ink" aria-label="Cart">
            <FiShoppingBag />
            {itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-black text-white">{itemCount}</span>}
          </Link>
          <button title="Open menu" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full bg-white xl:hidden dark:bg-white/10 dark:text-white" aria-label="Open menu"><FiMenu /></button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed inset-y-0 right-0 z-50 w-80 max-w-[90vw] bg-cream p-5 shadow-soft dark:bg-[#201c2a] xl:hidden">
            <button onClick={() => setOpen(false)} className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-white/70 dark:bg-white/10"><FiX /></button>
            <div className="mt-8 grid gap-3">
              {navLinks.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={linkClass}>{link.label}</NavLink>)}
              {isSeller && <NavLink to="/seller-dashboard" onClick={() => setOpen(false)} className={linkClass}>Seller Dashboard</NavLink>}
              {!user ? (
                <>
                  <NavLink to="/login" onClick={() => setOpen(false)} className={linkClass}>Login</NavLink>
                  <NavLink to="/register" onClick={() => setOpen(false)} className={linkClass}>Register</NavLink>
                  <NavLink to="/seller-register" onClick={() => setOpen(false)} className={linkClass}>Become a Seller</NavLink>
                </>
              ) : (
                <>
                  <NavLink to={user.role === "seller" ? "/seller-dashboard" : "/customer-dashboard"} onClick={() => setOpen(false)} className={linkClass}>My Dashboard</NavLink>
                  <button onClick={() => { logout(); setOpen(false); }} className="rounded-full px-4 py-2 text-left text-sm font-bold transition hover:bg-white/60 dark:hover:bg-white/10">Logout</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
