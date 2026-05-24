import { useEffect, useState } from "react";
import { categories, festiveEvents, products, sellerStories, testimonials } from "../data/products";
import CategoryCard from "../components/CategoryCard";
import HeroBanner from "../components/HeroBanner";
import NewsletterSection from "../components/NewsletterSection";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import ReviewCard from "../components/ReviewCard";
import SectionHeading from "../components/SectionHeading";
import SellerCard from "../components/SellerCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import SellerSkeleton from "../components/SellerSkeleton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const [quickProduct, setQuickProduct] = useState(null);
  const [loadingSections, setLoadingSections] = useState(true);
  const featured = products.filter((product) => product.trend).slice(0, 4);
  const visibleCategories = categories.slice(0, 8);
  const activeEvent = festiveEvents[0];

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadingSections(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <PageTransition>
      <HeroBanner />

      <section className="container-soft py-14">
        <SectionHeading eyebrow="Featured" title="Handmade favorites" text="A curated shelf of soft, giftable pieces from verified small sellers." />
        {loadingSections ? <LoadingSkeleton count={4} /> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => <ProductCard key={product.id} product={product} onQuickView={setQuickProduct} />)}
          </div>
        )}
      </section>

      <section className="container-soft py-14">
        <SectionHeading eyebrow="Categories" title="Shop by craft mood" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCategories.map((category) => <CategoryCard key={category} category={category} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/shop" className="pill-button bg-ink text-white shadow-soft dark:bg-pastelPink dark:text-ink">Explore more</Link>
        </div>
      </section>

      <section className="container-soft py-14">
        <div className="overflow-hidden rounded-[28px] bg-gradient-to-r from-[#fff0d8] via-pastelPink to-pastelBlue p-6 shadow-soft dark:from-[#342737] dark:via-[#2d2638] dark:to-[#1f3440] md:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-rose-600 dark:text-rose-200">Event Sale</p>
              <h2 className="mt-3 text-3xl font-black md:text-5xl">{activeEvent.name}</h2>
              <p className="mt-3 text-lg font-semibold text-slate-700 dark:text-slate-100">{activeEvent.offer}</p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {["142", "08", "26"].map((value, index) => (
                  <div key={index} className="rounded-2xl bg-white/70 p-4 dark:bg-white/10">
                    <p className="text-2xl font-black">{value}</p>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-300">{["Days", "Hours", "Mins"][index]}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {products.filter((product) => product.eventTags?.includes(activeEvent.name)).slice(0, 3).map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group overflow-hidden rounded-[24px] bg-white/70 p-3 shadow-sm dark:bg-white/10">
                  <img src={product.images[0]} alt={product.title} loading="lazy" className="aspect-square w-full rounded-[18px] object-cover transition duration-500 group-hover:scale-105" />
                  <p className="mt-3 text-sm font-black">{product.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-soft py-14">
        <SectionHeading eyebrow="Featured Small Businesses" title="Meet the makers behind the magic" text="Each shop has its own products, story, rating, and verified seller profile." />
        {loadingSections ? <SellerSkeleton /> : (
          <div className="grid gap-6 md:grid-cols-3">
            {sellerStories.map((story) => <SellerCard key={story.name} story={story} />)}
          </div>
        )}
      </section>

      <section className="container-soft py-14">
        <SectionHeading eyebrow="Testimonials" title="Loved by thoughtful shoppers" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((review) => <ReviewCard key={review.name} review={review} />)}
        </div>
      </section>

      <NewsletterSection />
      <QuickViewModal product={quickProduct} onClose={() => setQuickProduct(null)} />
    </PageTransition>
  );
}
