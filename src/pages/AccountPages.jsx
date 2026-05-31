import { FiHeart, FiHome, FiPackage, FiShoppingBag, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

const accountLinks = [
  { to: "/account/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/account/wishlist", label: "Wishlist", icon: FiHeart },
  { to: "/account/addresses", label: "Addresses", icon: FiHome },
  { to: "/account/profile", label: "Profile", icon: FiUser }
];

function AccountShell({ title, children }) {
  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        <aside className="glass-card h-fit rounded-[30px] p-5 lg:sticky lg:top-24">
          <h2 className="text-xl font-black">My Account</h2>
          <div className="mt-6 grid gap-2">
            {accountLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${isActive ? "bg-ink text-white dark:bg-pastelPink dark:text-ink" : "bg-white/55 hover:bg-pastelBlue dark:bg-white/10"}`}>
                  <Icon /> {item.label}
                </NavLink>
              );
            })}
          </div>
        </aside>
        <div className="space-y-8">
          <h1 className="text-4xl font-black">{title}</h1>
          {children}
        </div>
      </section>
    </PageTransition>
  );
}

export function OrdersPage() {
  const { orders } = useShop();
  const stages = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

  return (
    <AccountShell title="Orders">
      <div className="grid gap-4">
        {orders.length ? orders.map((order) => (
          <div key={order.id} className="glass-card rounded-[30px] p-6">
            <div className="flex flex-wrap justify-between gap-3">
              <span className="font-black">{order.id}</span>
              <span className="font-bold">Payment: {order.payment}</span>
              <span className="font-bold">{order.deliveredAt ? `Delivered: ${order.deliveredAt}` : `Expected delivery: ${order.expectedDelivery}`}</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-5">
              {stages.map((stage) => {
                const activeIndex = stages.indexOf(order.status);
                const index = stages.indexOf(stage);
                return <div key={stage} className={`rounded-2xl p-3 text-center text-xs font-black ${index <= activeIndex ? "bg-mint text-ink" : "bg-white/70 dark:bg-white/10"}`}>{stage}</div>;
              })}
            </div>
          </div>
        )) : <EmptyState icon={FiPackage} title="No orders yet." text="Your handmade orders will appear here after checkout." />}
      </div>
    </AccountShell>
  );
}

export function WishlistPage() {
  const { wishlist } = useShop();

  return (
    <AccountShell title="Wishlist">
      {wishlist.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{wishlist.map((product) => <ProductCard key={product.id} product={product} onQuickView={() => {}} />)}</div>
      ) : <EmptyState icon={FiHeart} title="No wishlist items yet." text="Tap the heart on a product after login to save it here." />}
    </AccountShell>
  );
}

export function AddressesPage() {
  const { user } = useShop();

  return (
    <AccountShell title="Addresses">
      <div className="glass-card rounded-[30px] p-6">
        <h2 className="text-2xl font-black">Saved address</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input placeholder="Name" defaultValue={user?.name || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
          <input placeholder="Mobile" defaultValue={user?.phone || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
          <input placeholder="Address" defaultValue={user?.address || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10 md:col-span-2" />
        </div>
      </div>
    </AccountShell>
  );
}

export function ProfilePage() {
  const { user } = useShop();

  return (
    <AccountShell title="Profile">
      <div className="glass-card rounded-[30px] p-6">
        <h2 className="text-2xl font-black">Profile details</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input placeholder="Name" defaultValue={user?.name || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
          <input placeholder="Email" defaultValue={user?.email || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
          <input placeholder="Mobile" defaultValue={user?.phone || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
          <input placeholder="Role" defaultValue={user?.role || "customer"} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold capitalize outline-none dark:bg-white/10" />
        </div>
      </div>
    </AccountShell>
  );
}

function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="glass-card rounded-[28px] p-8 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pastelPink text-2xl text-ink"><Icon /></div>
      <p className="mt-5 text-2xl font-black">{title}</p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">{text}</p>
    </div>
  );
}
