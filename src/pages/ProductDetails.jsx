import { useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { FiCheckCircle, FiGlobe, FiRefreshCw, FiShoppingBag, FiTruck, FiVideo, FiZap } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import ProductGallery from "../components/ProductGallery";
import RatingStars from "../components/RatingStars";
import ReviewCard from "../components/ReviewCard";
import WishlistButton from "../components/WishlistButton";
import { useShop } from "../context/ShopContext";
import { slugifySeller } from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, addRecentlyViewed, isCustomer, showToast } = useShop();
  const product = products.find((item) => item.id === Number(id));

  useEffect(() => {
    if (product) addRecentlyViewed(product);
  }, [product, addRecentlyViewed]);

  if (!product) return <div className="container-soft py-20 text-center font-black">Product not found.</div>;

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    if (!isCustomer) {
      showToast("Please login first");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  const handleBuyNow = () => {
    if (!isCustomer) {
      showToast("Please login to continue");
      navigate("/login");
      return;
    }
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <PageTransition>
      <section className="container-soft grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <ProductGallery images={product.images} title={product.title} />
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-rose-400">{product.category}</p>
              <h1 className="mt-2 text-4xl font-black md:text-5xl">{product.title}</h1>
            </div>
            <WishlistButton product={product} />
          </div>
          <div className="mt-4"><RatingStars rating={product.rating} /></div>
          <p className="mt-5 text-4xl font-black">₹{product.price}</p>
          <p className="mt-5 leading-8 text-slate-600 dark:text-slate-200">{product.description}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-black uppercase text-slate-500 dark:text-slate-300">Color variants</p>
              <div className="mt-2 flex flex-wrap gap-2">{product.colors?.map((color) => <span key={color} className="rounded-full bg-white/70 px-3 py-2 text-sm font-bold dark:bg-white/10">{color}</span>)}</div>
            </div>
            <div>
              <p className="text-sm font-black uppercase text-slate-500 dark:text-slate-300">Size variants</p>
              <div className="mt-2 flex flex-wrap gap-2">{product.sizes?.map((size) => <span key={size} className="rounded-full bg-white/70 px-3 py-2 text-sm font-bold dark:bg-white/10">{size}</span>)}</div>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={handleAddToCart} className="pill-button bg-ink text-white hover:shadow-glow dark:bg-pastelPink dark:text-ink"><FiShoppingBag /> Add to cart</button>
            <button onClick={handleBuyNow} className="pill-button bg-pastelPink text-ink hover:scale-[1.02] dark:bg-pastelBlue dark:text-ink"><FiZap /> Buy now</button>
          </div>

          <div className="glass-card mt-8 rounded-[28px] p-5">
            <div className="flex items-center gap-4">
              <img src={product.seller.avatar} alt={product.seller.name} className="h-16 w-16 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-2">
                  <Link to={`/seller/${slugifySeller(product.seller.name)}`} className="font-black hover:text-rose-500">{product.seller.name}</Link>
                  {product.seller.verified && <FiCheckCircle className="text-emerald-500" />}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-300">{product.seller.location}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <a href={product.seller.socials.instagram} className="grid h-10 w-10 place-items-center rounded-full bg-pastelPink"><FaInstagram /></a>
              <a href={product.seller.socials.website} className="grid h-10 w-10 place-items-center rounded-full bg-pastelBlue"><FiGlobe /></a>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/65 p-4 font-bold dark:bg-white/10"><FiTruck className="mb-2 text-rose-500" /> Estimated delivery<br /><span className="text-sm text-slate-600 dark:text-slate-200">{product.estimatedDelivery}</span></div>
            <div className="rounded-2xl bg-white/65 p-4 font-bold dark:bg-white/10"><FiRefreshCw className="mb-2 text-rose-500" /> Return policy<br /><span className="text-sm text-slate-600 dark:text-slate-200">{product.policy?.returnAvailable ? `${product.policy.returnDays} days` : "No returns"}</span></div>
            <div className="rounded-2xl bg-white/65 p-4 font-bold dark:bg-white/10"><FiVideo className="mb-2 text-rose-500" /> Product video<br /><span className="text-sm text-slate-600 dark:text-slate-200">{product.video ? "Available" : "Coming soon"}</span></div>
          </div>
          <div className="glass-card mt-6 rounded-[24px] p-5">
            <h2 className="text-xl font-black">Handmade details</h2>
            <p className="mt-2 leading-7 text-slate-600 dark:text-slate-200">{product.handmadeDetails}</p>
            <h3 className="mt-4 font-black">Return and exchange</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200">{product.policy?.refundRules}</p>
          </div>
        </div>
      </section>

      <section className="container-soft py-10">
        <h2 className="mb-5 text-3xl font-black">Reviews</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {product.reviews.map((review) => <ReviewCard key={review.user} review={review} highlight={review.rating > 3.5} />)}
        </div>
      </section>

      <section className="container-soft py-12">
        <h2 className="mb-6 text-3xl font-black">Related products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => <ProductCard key={item.id} product={item} onQuickView={() => {}} />)}
        </div>
      </section>
    </PageTransition>
  );
}
