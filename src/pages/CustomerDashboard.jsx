import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

const items = [
  { id: "orders", label: "Orders" },
  { id: "wishlist", label: "Wishlist" },
  { id: "addresses", label: "Addresses" },
  { id: "settings", label: "Profile" }
];

const stages = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export default function CustomerDashboard() {
  const [active, setActive] = useState("orders");
  const { wishlist, recentlyViewed, notifications, user } = useShop();
  const customerNotifications = notifications.filter((item) => item.role === "customer");

  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar title="My Account" items={items} active={active} setActive={setActive} />
        <div className="space-y-8">
          <h1 className="text-4xl font-black">Customer dashboard</h1>
          <div className="grid gap-5 md:grid-cols-3">
            {["Current orders", "Previous orders", "Saved addresses"].map((label, index) => (
              <div key={label} className="glass-card rounded-[24px] p-5"><p className="text-sm font-bold text-slate-500 dark:text-slate-300">{label}</p><p className="mt-2 text-3xl font-black">{[2, 8, 3][index]}</p></div>
            ))}
          </div>
          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Order tracking</h2>
            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl bg-white/60 p-4 dark:bg-white/10">
                <div className="flex flex-wrap justify-between gap-3">
                  <span className="font-black">AK-1008</span>
                  <span className="font-bold">Payment: UPI</span>
                  <span className="font-bold">Expected delivery: 27 May 2026</span>
                  <span className="font-bold">Invoice: INV-AK-1008</span>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-5">
                  {stages.map((stage, index) => <div key={stage} className={`rounded-2xl p-3 text-center text-xs font-black ${index < 4 ? "bg-mint text-ink" : "bg-white/70 dark:bg-white/10"}`}>{stage}</div>)}
                </div>
              </div>
              <div className="rounded-2xl bg-white/60 p-4 dark:bg-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3"><span className="font-black">AK-0996</span><span>Delivered: 15 May 2026</span><Link to="/product/6" className="pill-button bg-pastelPink px-4 py-2 text-ink">Give Feedback</Link></div>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Notifications</h2>
            <div className="mt-4 grid gap-3">{customerNotifications.map((item) => <p key={item.id} className="rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10">{item.text}</p>)}</div>
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-black">Wishlist</h2>
            {wishlist.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{wishlist.map((product) => <ProductCard key={product.id} product={product} onQuickView={() => {}} />)}</div> : <div className="glass-card rounded-[28px] p-8 text-center"><p className="text-2xl font-black">No wishlist items yet.</p><p className="mt-2 text-sm text-slate-600 dark:text-slate-200">Tap the heart on a product after login to save it here.</p></div>}
          </div>
          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Saved addresses and profile</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input placeholder="Name" defaultValue={user?.name || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <input placeholder="Email" defaultValue={user?.email || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <input placeholder="Mobile" defaultValue={user?.phone || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <input placeholder="Address" defaultValue={user?.address || ""} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-black">Product suggestions</h2>
            {recentlyViewed.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{recentlyViewed.map((product) => <ProductCard key={product.id} product={product} onQuickView={() => {}} />)}</div> : <p className="glass-card rounded-[24px] p-6 font-bold">Recently viewed and wishlist-based suggestions will appear here.</p>}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
