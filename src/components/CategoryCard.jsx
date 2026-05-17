import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categoryArt = {
  crochet: "🧶",
  "clay art": "🎨",
  "pot painting": "🪴",
  candles: "🕯️",
  keychains: "🔑",
  "handmade jewelry": "💍"
};

export default function CategoryCard({ category }) {
  return (
    <motion.div whileHover={{ y: -6, rotate: -1 }} className="glass-card rounded-[28px] p-5 text-center">
      <Link to={`/shop?category=${encodeURIComponent(category)}`} className="block">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white/70 text-3xl shadow-inner dark:bg-white/10">
          {categoryArt[category]}
        </div>
        <h3 className="mt-4 text-lg font-black capitalize">{category}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Explore small-batch pieces</p>
      </Link>
    </motion.div>
  );
}
