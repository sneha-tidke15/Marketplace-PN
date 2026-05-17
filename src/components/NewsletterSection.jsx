import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { useShop } from "../context/ShopContext";

export default function NewsletterSection() {
  const { showToast } = useShop();

  return (
    <section className="container-soft py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card pastel-gradient rounded-[36px] p-8 text-center md:p-12"
      >
        <FiMail className="mx-auto text-4xl text-rose-500" />
        <h2 className="mt-4 text-3xl font-black md:text-4xl">Get cozy craft drops first</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-200">
          Join the PastelNest newsletter for new maker stories, seasonal trends, and exclusive handmade offers.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            showToast("Thanks for joining the newsletter");
          }}
          className="mx-auto mt-7 flex max-w-xl flex-col gap-3 rounded-[28px] bg-white/70 p-2 shadow-inner dark:bg-white/10 sm:flex-row"
        >
          <input className="min-h-12 flex-1 bg-transparent px-4 font-semibold outline-none" placeholder="Enter your email" type="email" required />
          <button className="pill-button bg-ink text-white dark:bg-pastelPink dark:text-ink">Subscribe</button>
        </form>
      </motion.div>
    </section>
  );
}
