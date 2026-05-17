import { useEffect, useState } from "react";
import { categories, products, sellerStories, testimonials } from "../data/products";
import CategoryCard from "../components/CategoryCard";
import DeveloperSection from "../components/DeveloperSection";
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

export default function Home() {
  const [quickProduct, setQuickProduct] = useState(null);
  const [loadingSections, setLoadingSections] = useState(true);
  const featured = products.filter((product) => product.trend).slice(0, 4);

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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => <CategoryCard key={category} category={category} />)}
        </div>
      </section>

      <section className="container-soft py-14">
        <SectionHeading eyebrow="Latest trends" title="Pastel pieces shoppers love" text="Pearl jewelry, lavender candles, and keepsake trays are leading this week." />
        <div className="grid gap-5 md:grid-cols-3">
          {["Pearlcore details", "Desk decor gifts", "Cozy candle corners"].map((trend, index) => (
            <div key={trend} className="glass-card rounded-[30px] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-pastelPink text-xl font-black">{index + 1}</span>
              <h3 className="mt-5 text-2xl font-black">{trend}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200">Soft colors, handmade textures, and personalized details are shaping this season.</p>
            </div>
          ))}
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
      <DeveloperSection />
      <QuickViewModal product={quickProduct} onClose={() => setQuickProduct(null)} />
    </PageTransition>
  );
}
