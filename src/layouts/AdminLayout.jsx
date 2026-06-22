import { useMemo, useState } from "react";
import { FiBarChart2, FiBell, FiBox, FiCheckCircle, FiChevronLeft, FiCreditCard, FiGrid, FiLogOut, FiMenu, FiPackage, FiSearch, FiSettings, FiShoppingCart, FiStar, FiTruck, FiUsers, FiX } from "react-icons/fi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminSearchItems } from "../data/adminMockData";
import { logoutAdmin } from "../utils/adminAuth";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: FiGrid },
  { label: "Products", to: "/admin/products", icon: FiBox },
  { label: "Product Approvals", to: "/admin/product-approvals", icon: FiPackage },
  { label: "Sellers", to: "/admin/sellers", icon: FiUsers },
  { label: "Seller Approvals", to: "/admin/seller-approvals", icon: FiCheckCircle },
  { label: "Customers", to: "/admin/customers", icon: FiUsers },
  { label: "Orders", to: "/admin/orders", icon: FiShoppingCart },
  { label: "Reviews", to: "/admin/reviews", icon: FiStar },
  { label: "Coupons", to: "/admin/coupons", icon: FiCreditCard },
  { label: "Delivery", to: "/admin/delivery", icon: FiTruck },
  { label: "Payouts", to: "/admin/payouts", icon: FiCreditCard },
  { label: "Reports", to: "/admin/reports", icon: FiBarChart2 },
  { label: "Notifications", to: "/admin/notifications", icon: FiBell },
  { label: "Settings", to: "/admin/settings", icon: FiSettings }
];

function Sidebar({ collapsed, closeDrawer }) {
  return (
    <aside className={`${collapsed ? "lg:w-20" : "lg:w-72"} flex h-full w-72 flex-col border-r border-[rgba(75,21,52,0.10)] bg-white transition-all`}>
      <div className="flex min-h-20 items-center justify-between border-b border-[rgba(75,21,52,0.10)] px-5">
        <div className={collapsed ? "lg:hidden" : ""}>
          <p className="text-xs font-black uppercase text-accent">PastelNest</p>
          <h1 className="text-xl font-black">Admin</h1>
        </div>
        <button onClick={closeDrawer} className="grid h-10 w-10 place-items-center rounded-full bg-surface-soft lg:hidden"><FiX /></button>
      </div>
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === "/admin"}
            onClick={closeDrawer}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition ${
                isActive ? "bg-primary text-white shadow-soft" : "text-text-secondary hover:bg-surface-soft hover:text-primary"
              }`
            }
          >
            <Icon className="shrink-0 text-lg" />
            <span className={collapsed ? "lg:hidden" : ""}>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    if (!query.trim()) return [];
    return adminSearchItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }, [query]);

  return (
    <div className="min-h-screen bg-cream text-text-primary">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar collapsed={collapsed} closeDrawer={() => {}} />
      </div>
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Close admin menu" className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative h-full"><Sidebar collapsed={false} closeDrawer={() => setDrawerOpen(false)} /></div>
        </div>
      )}
      <div className={`${collapsed ? "lg:pl-20" : "lg:pl-72"} transition-all`}>
        <header className="sticky top-0 z-30 border-b border-[rgba(75,21,52,0.10)] bg-white/95 backdrop-blur">
          <div className="flex min-h-20 items-center gap-3 px-4 sm:px-6">
            <button onClick={() => setDrawerOpen(true)} className="grid h-11 w-11 place-items-center rounded-full bg-surface-soft lg:hidden"><FiMenu /></button>
            <button onClick={() => setCollapsed((value) => !value)} className="hidden h-11 w-11 place-items-center rounded-full bg-surface-soft lg:grid"><FiChevronLeft className={collapsed ? "rotate-180" : ""} /></button>
            <div className="relative min-w-0 flex-1">
              <label className="flex max-w-2xl items-center gap-3 rounded-full border border-[rgba(75,21,52,0.12)] bg-surface-soft px-4 py-3">
                <FiSearch className="shrink-0 text-accent" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, orders, sellers, customers" className="w-full border-0 bg-transparent text-sm font-bold outline-none" />
              </label>
              {matches.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 max-w-2xl rounded-3xl border border-[rgba(75,21,52,0.12)] bg-white p-2 shadow-lift">
                  {matches.map((item) => (
                    <button key={`${item.type}-${item.label}`} onClick={() => { setQuery(""); navigate(item.to); }} className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-black hover:bg-surface-soft">
                      <span>{item.label}</span><span className="text-xs text-text-secondary">{item.type}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { logoutAdmin(); navigate("/admin-login", { replace: true }); }} className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white" aria-label="Admin logout"><FiLogOut /></button>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
