import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import SearchBar from "../components/SearchBar";
import { useShop } from "../context/ShopContext";

export default function Shop() {
  const [params] = useSearchParams();
  const { products } = useShop();
  const [search, setSearch] = useState(params.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(params.get("category") || "all");
  const [sortBy, setSortBy] = useState("featured");
  const [quickProduct, setQuickProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearch(params.get("search") || "");
    setSelectedCategory(params.get("category") || "all");
  }, [params]);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, [search, selectedCategory, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    if (sortBy === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, search, selectedCategory, sortBy]);

  return (
    <PageTransition>
      <section className="pastel-gradient py-12">
        <div className="container-soft">
          <h1 className="text-4xl font-black md:text-5xl">Shop handmade products</h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-200">Browse small business creations with soft filters, search, sorting, and quick view.</p>
          <div className="mt-8 max-w-2xl"><SearchBar value={search} onChange={setSearch} /></div>
        </div>
      </section>

      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        <FilterSidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortBy={sortBy} setSortBy={setSortBy} />
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="font-bold">{filteredProducts.length} products found</p>
            <p className="rounded-full bg-pastelBlue px-4 py-2 text-sm font-bold capitalize">{selectedCategory}</p>
          </div>
          {loading ? <LoadingSkeleton count={8} /> : filteredProducts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onQuickView={setQuickProduct} />)}
            </div>
          ) : (
            <div className="glass-card rounded-[32px] p-10 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pastelPink text-2xl text-ink"><FiSearch /></div>
              <h2 className="mt-5 text-2xl font-black">No products found</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-200">Try another search term or explore a different handmade category.</p>
            </div>
          )}
        </div>
      </section>
      <QuickViewModal product={quickProduct} onClose={() => setQuickProduct(null)} />
    </PageTransition>
  );
}
