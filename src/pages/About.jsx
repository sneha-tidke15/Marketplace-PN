import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import SellerCard from "../components/SellerCard";
import { sellerStories } from "../data/products";

const visuals = [
  "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80"
];

export default function About() {
  return (
    <PageTransition>
      <section className="pastel-gradient py-16">
        <div className="container-soft grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-rose-500">About PastelNest</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">Welcome to PastelNest</h1>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700 dark:text-slate-100">
              <p>Welcome to PastelNest — a creative marketplace where handmade artistry meets modern shopping.</p>
              <p>Our platform is specially designed for talented small business owners and artisans who create beautiful handmade products such as clay art, crochet items, candles, jewelry, and home decor. We believe every handmade product carries creativity, passion, and a personal touch that makes it truly special.</p>
              <p>✨ Handmade with love<br />✨ Crafted by talented artisans<br />✨ Designed to support small businesses</p>
              <p>Join us in celebrating creativity, craftsmanship, and the beauty of handmade products.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {visuals.map((image, index) => (
              <motion.img
                key={image}
                src={image}
                alt="Indian handmade artisan lifestyle"
                loading="lazy"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"} rounded-[28px] object-cover shadow-soft`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="container-soft py-14">
  <div className="grid gap-6 md:grid-cols-3">

    {/* CARD 1 */}
    <div className="glass-card rounded-[24px] p-6">
      <h2 className="text-2xl font-black">
        Authentic Handmade Products
      </h2>

      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-200">
        Explore unique handmade creations crafted with love by talented local artisans across India.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="glass-card rounded-[24px] p-6">
      <h2 className="text-2xl font-black">
        Empowering Small Businesses
      </h2>

      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-200">
        We help creative sellers showcase their handmade products and grow their businesses online.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="glass-card rounded-[24px] p-6">
      <h2 className="text-2xl font-black">
        Trusted Shopping Experience
      </h2>

      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-200">
        Enjoy secure payments, smooth browsing, and a modern marketplace designed for handmade commerce.
      </p>
    </div>

  </div>
</section>
      <section className="container-soft py-14">
        <h2 className="mb-6 text-3xl font-black">Seller stories</h2>
        <div className="grid gap-6 md:grid-cols-3">{sellerStories.map((story) => <SellerCard key={story.name} story={story} />)}</div>
      </section>
    </PageTransition>
  );
}
