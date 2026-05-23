import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGlobe, FiHeart, FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { categories } from "../data/products";

export default function Footer() {
  const { isCustomer, isSeller } = useShop();

  return (
    <footer className="border-t border-rose-100 bg-[#fff3e9] pt-14 dark:border-white/10 dark:bg-[#181520]">
      <div className="container-soft grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pastelPink via-[#ffe8c7] to-pastelBlue text-xl font-black text-ink">PN</span>
            <span>
              <span className="block text-xl font-black">PastelNest</span>
              <span className="text-xs font-black text-rose-500">Handmade with Love 💖</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-200">
            A premium Indian handmade marketplace for local artisans, handmade creators, and small businesses.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-bold"><FiHeart className="text-rose-500" /> Crafted for supporting small businesses.</p>
        </div>

        <div>
          <h3 className="font-black">Customer Support</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-200">
            <Link to="/shop">Shop</Link>
            <Link to={isCustomer ? "/customer-dashboard" : "/login"}>Orders and wishlist</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/contact">Contact support</Link>
          </div>
        </div>

        <div>
          <h3 className="font-black">Seller Support</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-200">
            <Link to={isSeller ? "/seller-dashboard" : "/seller-register"}>{isSeller ? "Seller dashboard" : "Become a seller"}</Link>
            <Link to="/seller-login">Seller login</Link>
            <Link to="/contact">Shipping help</Link>
            <Link to="/contact">Return policy tools</Link>
          </div>
        </div>

        <div>
          <h3 className="font-black">Categories</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold capitalize text-slate-600 dark:text-slate-200">
            {categories.slice(0, 10).map((category) => <Link key={category} to={`/shop?category=${encodeURIComponent(category)}`}>{category}</Link>)}
          </div>
        </div>

        <div>
          <h3 className="font-black">Policies</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-200">
            <Link to="/contact">Returns and exchange</Link>
            <Link to="/contact">Payment issues</Link>
            <Link to="/contact">Delivery delay</Link>
            <Link to="/contact">Customization queries</Link>
          </div>
          <h3 className="mt-7 font-black">Contact</h3>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-200"><FiMail /> hello@pastelnest.com</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-200"><FiPhone /> +91 98765 43210</p>
        </div>
      </div>
      <div className="border-t border-rose-100 px-4 py-6 text-center text-sm font-semibold leading-7 text-slate-600 dark:border-white/10 dark:text-slate-200">
        © 2026 PastelNest Marketplace.<br />
        Built by AXINEX TECHNOLOGIES
        <div className="mt-4 flex justify-center gap-3">
          {[FiGlobe, FiMail, FaLinkedin, FaInstagram].map((Icon, index) => (
            <a title="AXINEX TECHNOLOGIES contact" key={index} href="#" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:-translate-y-1 dark:bg-white/10 dark:text-white" aria-label="AXINEX TECHNOLOGIES social link">
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
