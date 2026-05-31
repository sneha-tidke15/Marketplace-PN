import { motion } from "framer-motion";
import { FiBox, FiGift, FiHome, FiImage, FiLayers, FiPenTool, FiShoppingBag, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

const categoryIcons = {
  crochet: FiLayers,
  "clay art": FiPenTool,
  "resin art": FiStar,
  "pot painting": FiHome,
  candles: FiStar,
  "handmade jewelry": FiStar,
  handbags: FiShoppingBag,
  embroidery: FiPenTool,
  "home decor": FiHome,
  "handmade paintings": FiImage,
  "handmade gifts": FiGift,
  macrame: FiLayers,
  terracotta: FiBox,
  "fabric art": FiLayers,
  "handmade toys": FiGift,
  "wooden crafts": FiBox,
  "floral crafts": FiStar,
  "handwoven products": FiLayers
};

const categoryDescriptions = {
  crochet: "Soft handmade crochet creations crafted with creativity and care.",
  "clay art": "Beautiful clay pieces designed with artistic handmade charm.",
  "resin art": "Unique resin creations with modern aesthetic designs.",
  "pot painting": "Hand-painted pots perfect for cozy and creative spaces.",
  candles: "Cozy handmade candles crafted to brighten your mood.",
  handbags: "Stylish handcrafted bags made with creativity and detail.",
  embroidery: "Traditional embroidery art blended with modern handmade fashion.",
  "handmade jewelry": "Elegant handmade jewelry crafted for unique personal style."
};

export default function CategoryCard({ category }) {
  const Icon = categoryIcons[category] || FiBox;

  return (
    <motion.div whileHover={{ y: -6, rotate: -1 }} className="glass-card h-full rounded-[28px] p-5 text-center">
      <Link to={`/shop?category=${encodeURIComponent(category)}`} className="block">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white/70 text-3xl text-rose-500 shadow-inner dark:bg-white/10">
          <Icon />
        </div>
        <h3 className="mt-4 text-lg font-black capitalize">{category}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          {categoryDescriptions[category] || "Explore beautiful handmade creations crafted with care."}
        </p>
      </Link>
    </motion.div>
  );
}
