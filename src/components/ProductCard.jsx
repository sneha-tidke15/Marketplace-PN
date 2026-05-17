import { motion } from "framer-motion";
import { FiEye, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import RatingStars from "./RatingStars";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const { addToCart, isCustomer, showToast } = useShop();

  return (
    <motion.article
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glass-card shine-card overflow-hidden rounded-[28px]"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-b-[30px]">
          <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition duration-500 hover:scale-110" />
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {product.trend && <span className="rounded-full bg-pastelPink px-3 py-1 text-xs font-extrabold">Trending</span>}
            <span className="rounded-full bg-mint px-3 py-1 text-xs font-extrabold">{product.discount}% off</span>
          </div>
          <div className="absolute right-4 top-4">
            <WishlistButton product={product} />
          </div>
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-rose-400">{product.category}</p>
          <Link to={`/product/${product.id}`} className="mt-1 block text-lg font-extrabold hover:text-rose-500">
            {product.title}
          </Link>
        </div>
        <RatingStars rating={product.rating} />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-black">₹{product.price}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="grid h-10 w-10 place-items-center rounded-full bg-pastelBlue text-ink transition hover:scale-105"
              aria-label="Quick view"
            >
              <FiEye />
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isCustomer) {
                  showToast("Please login first");
                  navigate("/login");
                  return;
                }
                addToCart(product);
              }}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition hover:scale-105 dark:bg-pastelPink dark:text-ink"
              aria-label="Add to cart"
            >
              <FiShoppingBag />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
