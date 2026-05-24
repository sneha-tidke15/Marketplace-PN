import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categoryArt = {
  crochet: "🧶",
  "clay art": "🎨",
  "resin art": "✨",
  "pot painting": "🪴",
  candles: "🕯️",
  keychains: "🔑",
  "handmade jewelry": "💍",
  handbags: "👜",
  embroidery: "🪡",
  "knitted wear": "🧥",
  "home decor": "🏡",
  "handmade paintings": "🖼️",
  "handmade gifts": "🎁",
  rakhi: "🎀",
  scrapbooks: "📒",
  "handmade cards": "💌",
  macrame: "🧵",
  terracotta: "🏺",
  "customized gifts": "🎉",
  "fabric art": "🪢",
  "handmade toys": "🧸",
  "handmade stationery": "✏️",
  "wooden crafts": "🪵",
  "floral crafts": "🌸",
  "handwoven products": "🧺"
};

const categoryDescriptions = {
  crochet: "Soft handmade crochet creations crafted with creativity and care.",

  "clay art":
    "Beautiful clay pieces designed with artistic handmade charm.",

  "resin art":
    "Unique resin creations with modern aesthetic designs.",

  "pot painting":
    "Hand-painted pots perfect for cozy and creative spaces.",

  candles:
    "Cozy handmade candles crafted to brighten your mood.",

  handbags:
    "Stylish handcrafted bags made with creativity and detail.",

  embroidery:
    "Traditional embroidery art blended with modern handmade fashion.",

  "handmade jewelry":
    "Elegant handmade jewelry crafted for unique personal style."
};

export default function CategoryCard({ category }) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -1 }}
      className="glass-card rounded-[28px] p-5 text-center"
    >
      <Link
        to={`/shop?category=${encodeURIComponent(category)}`}
        className="block"
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white/70 text-3xl shadow-inner dark:bg-white/10">
          {categoryArt[category]}
        </div>

        <h3 className="mt-4 text-lg font-black capitalize">
          {category}
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          {categoryDescriptions[category] ||
            "Explore beautiful handmade creations crafted with care."}
        </p>
      </Link>
    </motion.div>
  );
}