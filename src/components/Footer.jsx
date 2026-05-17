import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGlobe, FiHeart, FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { categories } from "../data/products";

export default function Footer() {
  const { isCustomer, isSeller } = useShop();

  return (
    <footer className="border-t border-white/50 bg-white/45 pt-14 backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="container-soft grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.1fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pastelPink via-lavender to-pastelBlue text-xl font-black text-ink">PN</span>
            <span>
              <span className="block text-xl font-black">PastelNest</span>
              <span className="text-xs font-black text-rose-500">Handmade with Love </span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-200">
            PastelNest is a multi-seller handmade marketplace for small businesses and thoughtful shoppers.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-bold"><FiHeart className="text-rose-500" /> Crafted for supporting small businesses.</p>
        </div>

        <div>
          <h3 className="font-black">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-200">
            <Link to="/shop">Shop</Link>
            <Link to={isSeller ? "/seller-dashboard" : "/seller-register"}>{isSeller ? "Seller dashboard" : "Become a seller"}</Link>
            <Link to={isCustomer ? "/customer-dashboard" : "/login"}>Customer dashboard</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-black">Categories</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold capitalize text-slate-600 dark:text-slate-200">
            {categories.map((category) => <Link key={category} to={`/shop?category=${encodeURIComponent(category)}`}>{category}</Link>)}
          </div>
          <div className="mt-6 flex gap-3">
            {[FaGithub, FaLinkedin, FaInstagram, FiGlobe, FiMail].map((Icon, index) => (
              <a key={index} href="#" className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-pastelPink to-pastelBlue text-ink shadow-sm transition hover:-translate-y-1 hover:shadow-glow" aria-label="Social link">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black">Seller Support</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-200">
            <Link to="/seller-register">Start selling</Link>
            <Link to="/seller-login">Seller login</Link>
            <Link to="/contact">Help center</Link>
          </div>
          <h3 className="mt-7 font-black">Contact Info</h3>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-200"><FiMail /> hello@pastelnest.com</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-200"><FiPhone /> +91 98765 43210</p>
        </div>
      </div>
      <div className="border-t border-white/50 px-4 py-5 text-center text-sm font-semibold leading-7 text-slate-600 dark:border-white/10 dark:text-slate-200">
        © 2026 PastelNest Marketplace.<br />
        Built by AXINEX TECHNOLOGIES.<br />
        Frontend Developed by Sneha Suresh Tidke.<br />
        Crafted  for supporting small businesses.
      </div>
    </footer>
  );
}
