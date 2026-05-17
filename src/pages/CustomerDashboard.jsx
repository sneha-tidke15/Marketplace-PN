import { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

const items = [
  { id: "orders", label: "Orders" },
  { id: "products", label: "Wishlist" },
  { id: "settings", label: "Profile" }
];

export default function CustomerDashboard() {
  const [active, setActive] = useState("orders");
  const { wishlist, recentlyViewed } = useShop();

  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar title="My Account" items={items} active={active} setActive={setActive} />
        <div className="space-y-8">
          <h1 className="text-4xl font-black">Customer dashboard</h1>
          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Order history</h2>
            {["PN-1008", "PN-0996", "PN-0912"].map((order, index) => <div key={order} className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/55 p-4 dark:bg-white/10"><span className="font-bold">{order}</span><span>₹{1299 - index * 250}</span><span className="rounded-full bg-mint px-3 py-1 text-xs font-black">Delivered</span></div>)}
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-black">Wishlist</h2>
            {wishlist.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{wishlist.map((product) => <ProductCard key={product.id} product={product} onQuickView={() => {}} />)}</div> : <div className="glass-card rounded-[28px] p-8 text-center"><p className="text-2xl font-black">No wishlist items yet.</p><p className="mt-2 text-sm text-slate-600 dark:text-slate-200">Tap the heart on a product after login to save it here.</p></div>}
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-black">Recently viewed</h2>
            {recentlyViewed.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{recentlyViewed.map((product) => <ProductCard key={product.id} product={product} onQuickView={() => {}} />)}</div> : <p className="glass-card rounded-[24px] p-6 font-bold">Recently viewed products will appear here.</p>}
          </div>
          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Profile settings</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input placeholder="Name" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <input placeholder="Email" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
