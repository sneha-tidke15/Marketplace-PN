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

      <DeveloperSection />
      <QuickViewModal product={quickProduct} onClose={() => setQuickProduct(null)} />
    </PageTransition>
  );
}
