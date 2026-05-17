import { FiBox, FiDollarSign, FiShoppingBag, FiUsers } from "react-icons/fi";
import AnalyticsCard from "../components/AnalyticsCard";
import PageTransition from "../components/PageTransition";
import { products } from "../data/products";

export default function AdminDashboard() {
  return (
    <PageTransition>
      <section className="container-soft py-12">
        <h1 className="text-4xl font-black">Admin dashboard</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <AnalyticsCard icon={FiUsers} label="Sellers" value="246" tone="bg-pastelPink" />
          <AnalyticsCard icon={FiUsers} label="Customers" value="8.4k" tone="bg-pastelBlue" />
          <AnalyticsCard icon={FiBox} label="Products" value="1.2k" tone="bg-mint" />
          <AnalyticsCard icon={FiDollarSign} label="GMV" value="₹12L" tone="bg-lavender" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Sales chart</h2>
            <div className="mt-6 flex h-64 items-end gap-4">
              {[42, 70, 55, 90, 76, 98, 82].map((height, index) => <div key={index} style={{ height: `${height}%` }} className="flex-1 rounded-t-2xl bg-gradient-to-t from-rose-300 to-pastelBlue" />)}
            </div>
          </div>
          <div className="glass-card rounded-[30px] p-6">
            <h2 className="text-2xl font-black">Manage products</h2>
            <div className="mt-4 grid gap-3">
              {products.slice(0, 5).map((product) => <div key={product.id} className="flex items-center justify-between rounded-2xl bg-white/55 p-3 dark:bg-white/10"><span className="font-bold">{product.title}</span><span className="rounded-full bg-mint px-3 py-1 text-xs font-black">Approved</span></div>)}
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {["Manage sellers", "Manage customers"].map((title) => <div key={title} className="glass-card rounded-[30px] p-6"><h2 className="text-2xl font-black">{title}</h2><div className="mt-4 grid gap-3">{["Verified", "Pending review", "Active"].map((status) => <div key={status} className="rounded-2xl bg-white/55 p-4 font-bold dark:bg-white/10">{status}</div>)}</div></div>)}
        </div>
      </section>
    </PageTransition>
  );
}
