import { useState } from "react";
import { FiBell, FiBox, FiDollarSign, FiShoppingBag } from "react-icons/fi";
import AnalyticsCard from "../components/AnalyticsCard";
import DashboardSidebar from "../components/DashboardSidebar";
import PageTransition from "../components/PageTransition";
import { useShop } from "../context/ShopContext";
import { categories, products } from "../data/products";

const items = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "orders", label: "Orders" },
  { id: "shipping", label: "Shipping" },
  { id: "notifications", label: "Notifications" }
];

export default function SellerDashboard() {
  const [active, setActive] = useState("overview");
  const { notifications } = useShop();
  const sellerNotifications = notifications.filter((item) => item.role === "seller");

  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar title="Seller Studio" items={items} active={active} setActive={setActive} />
        <div className="space-y-6">
          <h1 className="text-4xl font-black">Seller dashboard</h1>
          <div className="grid gap-5 md:grid-cols-4">
            <AnalyticsCard icon={FiDollarSign} label="Revenue" value="₹82k" tone="bg-mint" />
            <AnalyticsCard icon={FiShoppingBag} label="Orders" value="128" tone="bg-pastelPink" />
            <AnalyticsCard icon={FiBox} label="Products" value="36" tone="bg-pastelBlue" />
            <AnalyticsCard icon={FiBell} label="Alerts" value={String(sellerNotifications.length)} tone="bg-lavender" />
          </div>

          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Add product</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input placeholder="Product title" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <select className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10">{categories.map((category) => <option key={category}>{category}</option>)}</select>
              <input placeholder="Base price" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <input placeholder="Pricing variants" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <input placeholder="Color variants" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <input placeholder="Design variants" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <input type="file" multiple accept="image/*" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
              <input type="file" accept="video/*" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
            </div>
            <textarea placeholder="Handmade details, care instructions, return policy, exchange policy" className="mt-4 min-h-28 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
            <button className="pill-button mt-4 bg-ink text-white dark:bg-pastelPink dark:text-ink">Save product</button>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="glass-card rounded-[30px] p-6">
              <h2 className="text-2xl font-black">Order management</h2>
              {["Pending orders", "Delivered orders", "Return requests", "Customer messages"].map((label, index) => <div key={label} className="mt-4 flex justify-between rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10"><span>{label}</span><span>{[12, 84, 3, 7][index]}</span></div>)}
            </div>
            <div className="glass-card rounded-[30px] p-6">
              <h2 className="text-2xl font-black">Shipping settings</h2>
              {["Shipping price: ₹69 base", "Delivery regions: All India", "Pincode pricing enabled", "Estimated delivery: 4-8 days"].map((setting) => <p key={setting} className="mt-4 rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10">{setting}</p>)}
            </div>
          </div>

          <div className="glass-card rounded-[30px] p-6">
            <h2 className="mb-4 text-2xl font-black">Notifications</h2>
            <div className="grid gap-3">{sellerNotifications.map((item) => <p key={item.id} className="rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10">{item.text}</p>)}</div>
          </div>

          <div className="glass-card overflow-x-auto rounded-[30px] p-6">
            <h2 className="mb-4 text-2xl font-black">Product management</h2>
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead><tr className="text-slate-500 dark:text-slate-300"><th className="py-3">Product</th><th>Category</th><th>Price</th><th>Status</th></tr></thead>
              <tbody>{products.slice(0, 7).map((product) => <tr key={product.id} className="border-t border-white/60"><td className="py-3 font-bold">{product.title}</td><td className="capitalize">{product.category}</td><td>₹{product.price}</td><td><span className="rounded-full bg-mint px-3 py-1 text-xs font-black text-ink">Live</span></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
