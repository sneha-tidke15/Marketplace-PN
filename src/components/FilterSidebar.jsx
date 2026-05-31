import { FiChevronDown } from "react-icons/fi";
import { useShop } from "../context/ShopContext";

export default function FilterSidebar({ selectedCategory, setSelectedCategory, sortBy, setSortBy }) {
  const { categories } = useShop();

  return (
    <aside className="glass-card h-fit rounded-[28px] p-5">
      <h3 className="text-lg font-black">Filters</h3>
      <div className="mt-5 space-y-3">
        <button onClick={() => setSelectedCategory("all")} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${selectedCategory === "all" ? "bg-ink text-white dark:bg-pastelPink dark:text-ink" : "bg-white/60 hover:bg-pastelBlue dark:bg-white/10"}`}>
          All products
        </button>
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold capitalize transition ${selectedCategory === category ? "bg-ink text-white dark:bg-pastelPink dark:text-ink" : "bg-white/60 hover:bg-pastelBlue dark:bg-white/10"}`}>
            {category}
          </button>
        ))}
      </div>
      <label className="mt-6 block text-sm font-bold text-slate-700 dark:text-white">
        Sort by
        <div className="relative mt-2">
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="w-full appearance-none rounded-2xl border border-rose-100 bg-white px-5 py-3 pr-12 font-semibold text-slate-700 shadow-md outline-none transition-all duration-300 hover:border-pink-300 hover:shadow-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-100 dark:border-white/10 dark:bg-[#2b2438] dark:text-white dark:focus:ring-pink-500/20">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-300">
            <FiChevronDown />
          </span>
        </div>
      </label>
    </aside>
  );
}
