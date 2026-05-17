import PageTransition from "../components/PageTransition";
import SellerCard from "../components/SellerCard";
import { sellerStories } from "../data/products";

export default function About() {
  return (
    <PageTransition>
      <section className="pastel-gradient py-16">
        <div className="container-soft">
          <h1 className="text-5xl font-black">Support Small Businesses</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-200">PastelNest was created to give handmade sellers a beautiful digital shelf and help thoughtful customers find meaningful products.</p>
        </div>
      </section>
      <section className="container-soft py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {["Empower makers", "Celebrate handmade", "Build trust"].map((mission) => <div key={mission} className="glass-card rounded-[30px] p-6"><h2 className="text-2xl font-black">{mission}</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-200">We focus on premium presentation, seller visibility, and joyful shopping journeys.</p></div>)}
        </div>
      </section>
      <section className="container-soft py-14">
        <h2 className="mb-6 text-3xl font-black">Seller stories</h2>
        <div className="grid gap-6 md:grid-cols-3">{sellerStories.map((story) => <SellerCard key={story.name} story={story} />)}</div>
      </section>
    </PageTransition>
  );
}
