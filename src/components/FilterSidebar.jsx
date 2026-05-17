import { categories } from "../data/products";

export default function FilterSidebar({ selectedCategory, setSelectedCategory, sortBy, setSortBy }) {
  return (
    <aside className="glass-card h-fit rounded-[28px] p-5">
      <h3 className="text-lg font-black">Filters</h3>
      <div className="mt-5 space-y-3">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${selectedCategory === "all" ? "bg-ink text-white dark:bg-pastelPink dark:text-ink" : "bg-white/60 hover:bg-pastelBlue dark:bg-white/10"}`}
        >
          All products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-bold capitalize transition ${selectedCategory === category ? "bg-ink text-white dark:bg-pastelPink dark:text-ink" : "bg-white/60 hover:bg-pastelBlue dark:bg-white/10"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <label className="mt-6 block text-sm font-bold">
        Sort by
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="mt-2 w-full rounded-2xl border-0 bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to high</option>
          <option value="price-high">Price: High to low</option>
          <option value="rating">Top rated</option>
        </select>
      </label>
    </aside>
  );
}
