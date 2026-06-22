import { FiHeart, FiHome, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function MobileBottomNav() {
  const { cart, wishlist, user } = useShop();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const accountRoute = user?.role === "seller" ? "/seller-dashboard" : user ? "/customer-dashboard" : "/login";

  const items = [
    { label: "Home", to: "/", icon: FiHome },
    { label: "Search", to: "/shop", icon: FiSearch },
    { label: "Cart", to: "/cart", icon: FiShoppingBag, badge: cartCount },
    { label: "Wishlist", to: "/account/wishlist", icon: FiHeart, badge: wishlist.length },
    { label: "Account", to: accountRoute, icon: FiUser }
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[9998] border-t border-[rgba(75,21,52,0.12)] bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-12px_30px_rgba(75,21,52,0.10)] backdrop-blur lg:hidden"
      aria-label="Mobile bottom navigation"
    >
      <div className="mx-auto grid max-w-xl grid-cols-5 gap-1">
        {items.map(({ label, to, icon: Icon, badge }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[11px] font-black transition ${
                isActive ? "bg-primary text-white shadow-soft" : "text-text-secondary hover:bg-surface-soft hover:text-primary"
              }`
            }
          >
            <span className="relative">
              <Icon className="text-lg" />
              {badge > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-secondary px-1 text-[9px] text-text-primary">
                  {badge}
                </span>
              )}
            </span>
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
