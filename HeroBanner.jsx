import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import  bannerImage from "../assets/image1.png";
export default function HeroBanner() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="pastel-gradient relative overflow-hidden pb-20 pt-10">
      <div className="container-soft grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-extrabold text-rose-500 shadow-sm dark:bg-white/10">
            Handmade with Love 💖
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
            PASTELNEST
          </h1>
          <h2>
            Where Handmade Stories Come to Life.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-200">Discover beautiful handmade creations crafted by passionate artisans and small business owners across India. From crochet art and clay creations to candles, jewelry, and cozy decor — every piece is made with creativity, warmth, and love.
          </p>
          <form onSubmit={submitSearch} className="mt-8 flex max-w-2xl flex-col gap-3 rounded-[30px] bg-white/80 p-2 shadow-soft sm:flex-row dark:bg-white/10">
            <label className="flex min-h-14 flex-1 items-center gap-3 px-4">
              <FiSearch className="text-rose-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent font-semibold outline-none" placeholder="Search crochet, candles, jewelry..." />
            </label>
            <button className="pill-button bg-ink text-white shadow-soft dark:bg-pastelPink dark:text-ink">
              Shop now <FiArrowRight />
            </button>
          </form>
        </motion.div>
        <motion.div className="relative min-h-[440px]" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <motion.img animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 5 }} src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80" alt="Crochet handmade bag" loading="lazy" className="absolute right-0 top-0 h-64 w-52 rounded-[28px] object-cover shadow-soft sm:h-80 sm:w-64" />
          <motion.img animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5.8 }} src={bannerImage} alt="Indian handmade clay art" loading="lazy" className="absolute bottom-0 left-0 h-64 w-52 rounded-[28px] object-cover shadow-soft sm:h-80 sm:w-64" />
          <div className="glass-card absolute left-1/2 top-1/2 max-w-64 -translate-x-1/2 -translate-y-1/2 rounded-[24px] p-5">
            <p className="text-3xl font-black">1.2k+</p>
            <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-200">handmade pieces ready to brighten your day</p>
            <Link to="/seller-register" className="mt-4 inline-flex text-sm font-black text-rose-500">Start selling <FiArrowRight className="ml-1 mt-1" /></Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
