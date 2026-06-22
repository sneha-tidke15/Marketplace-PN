import { useEffect, useMemo, useRef, useState } from "react";
import { FiClock, FiGrid, FiHome, FiSearch, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { sellers } from "../data/products";

const popularSearches = ["Candles", "Handmade Candles", "Candle Holder", "Candle Store", "Crochet Bag", "Resin Coasters"];

function Highlight({ text, query }) {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-secondary/50 text-inherit">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function SearchSuggestions({ value, onChange, placeholder = "Search handmade products...", onSelect }) {
  const navigate = useNavigate();
  const { products, categories } = useShop();
  const [focused, setFocused] = useState(false);
  const [debounced, setDebounced] = useState(value);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value.trim()), 180);
    return () => window.clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setFocused(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const suggestions = useMemo(() => {
    const query = debounced.toLowerCase();
    const productMatches = products
      .filter((product) => product.title.toLowerCase().includes(query))
      .slice(0, 4)
      .map((product) => ({ type: "Product", label: product.title, icon: FiShoppingBag, to: `/product/${product.id}` }));
    const categoryMatches = categories
      .filter((category) => category.toLowerCase().includes(query))
      .slice(0, 4)
      .map((category) => ({ type: "Category", label: category, icon: FiGrid, to: `/shop?category=${encodeURIComponent(category)}` }));
    const storeMatches = sellers
      .filter((seller) => seller.name.toLowerCase().includes(query))
      .slice(0, 3)
      .map((seller) => ({ type: "Store", label: seller.name, icon: FiHome, to: `/seller/${seller.slug}` }));
    const popularMatches = popularSearches
      .filter((item) => !query || item.toLowerCase().includes(query))
      .slice(0, 4)
      .map((item) => ({ type: "Popular", label: item, icon: FiClock, to: `/shop?search=${encodeURIComponent(item)}` }));

    return [...productMatches, ...categoryMatches, ...storeMatches, ...popularMatches].slice(0, 8);
  }, [categories, debounced, products]);

  const showDropdown = focused && (value.trim().length > 0 || suggestions.length > 0);

  const choose = (item) => {
    onChange(item.label);
    setFocused(false);
    onSelect?.(item);
    navigate(item.to);
  };

  const onKeyDown = (event) => {
    if (!showDropdown || !suggestions.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      choose(suggestions[activeIndex]);
    }
    if (event.key === "Escape") setFocused(false);
  };

  return (
    <div ref={rootRef} className="relative w-full">
      <label className="glass-card flex w-full items-center gap-3 rounded-full px-5 py-3">
        <FiSearch className="shrink-0 text-lg text-rose-400" />
        <input
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setActiveIndex(0);
          }}
          onFocus={() => setFocused(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
        />
      </label>
      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-3xl border border-[rgba(75,21,52,0.12)] bg-white p-2 shadow-lift">
          {suggestions.length ? suggestions.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={`${item.type}-${item.label}`}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(item)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${activeIndex === index ? "bg-surface-soft" : "hover:bg-surface-soft"}`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary/25 text-primary"><Icon /></span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-black"><Highlight text={item.label} query={debounced} /></span>
                  <span className="text-xs font-bold text-text-secondary">{item.type}</span>
                </span>
              </button>
            );
          }) : (
            <div className="px-4 py-5 text-sm font-bold text-text-secondary">No suggestions found.</div>
          )}
        </div>
      )}
    </div>
  );
}
