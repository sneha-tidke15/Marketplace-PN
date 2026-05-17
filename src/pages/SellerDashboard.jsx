import { useState } from "react";
import { FiBell, FiBox, FiDollarSign, FiShoppingBag } from "react-icons/fi";
import AnalyticsCard from "../components/AnalyticsCard";
import DashboardSidebar from "../components/DashboardSidebar";
import PageTransition from "../components/PageTransition";
import { products } from "../data/products";

const items = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "orders", label: "Orders" },
  { id: "notifications", label: "Notifications" }
];

export default function SellerDashboard() {
  const [active, setActive] = useState("overview");

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
            <AnalyticsCard icon={FiBell} label="Alerts" value="5" tone="bg-lavender" />
          </div>

          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Add product</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {["Product title", "Category", "Price", "Image URL"].map((field) => <input key={field} placeholder={field} className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />)}
            </div>
            <textarea placeholder="Description" className="mt-4 min-h-28 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
            <button className="pill-button mt-4 bg-ink text-white dark:bg-pastelPink dark:text-ink">Save product</button>
          </div>

          <div className="glass-card overflow-x-auto rounded-[30px] p-6">
            <h2 className="mb-4 text-2xl font-black">Product management</h2>
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead><tr className="text-slate-500"><th className="py-3">Product</th><th>Category</th><th>Price</th><th>Status</th></tr></thead>
              <tbody>{products.slice(0, 5).map((product) => <tr key={product.id} className="border-t border-white/60"><td className="py-3 font-bold">{product.title}</td><td className="capitalize">{product.category}</td><td>₹{product.price}</td><td><span className="rounded-full bg-mint px-3 py-1 text-xs font-black">Live</span></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
