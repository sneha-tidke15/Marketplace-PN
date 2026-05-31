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
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pastelPink via-[#ffe8c7] to-pastelBlue text-xl font-black text-ink">AK</span>
            <span>
              <span className="block text-xl font-black">Akriti</span>
              <span className="text-xs font-black text-rose-500">Designed in Bharat</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-200">
            Akriti is a creative handmade marketplace connecting talented artisans and small businesses with people who love unique handmade products.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-bold"><FiHeart className="text-rose-500" /> Crafted for supporting small businesses.</p>
        </div>

        <div>
          <h3 className="font-black">Customer Support</h3>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-200">
            <Link to="/shop">Shop</Link>
            <Link to={isCustomer ? "/account/orders" : "/login"}>Orders and wishlist</Link>
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
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-200"><FiMail /> hello@akriti.com</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-200"><FiPhone /> +91 98765 43210</p>
        </div>
      </div>
      <div className="border-t border-rose-100 px-4 py-6 text-center text-sm font-semibold leading-7 text-slate-600 dark:border-white/10 dark:text-slate-200">
        © 2026 Akriti Marketplace.<br />
        All rights reserved. <br />
        Built by AXINEX TECHNOLOGIES
        <div className="mt-4 flex justify-center gap-3">
          <a href="https://axinextechnologies.com" target="_blank" rel="noreferrer" title="Website" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:-translate-y-1 dark:bg-white/10 dark:text-white"><FiGlobe /></a>
          <a href="mailto:axinex.technologies@gmail.com" title="Email" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:-translate-y-1 dark:bg-white/10 dark:text-white"><FiMail /></a>
          <a href="https://www.linkedin.com/company/axinex-technologies/" target="_blank" rel="noreferrer" title="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:-translate-y-1 dark:bg-white/10 dark:text-white"><FaLinkedin /></a>
          <a href="https://www.instagram.com/axinex_technologies?igsh=OHpsajNvOWMxOXlx" target="_blank" rel="noreferrer" title="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:-translate-y-1 dark:bg-white/10 dark:text-white"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}
