import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

const queryTypes = [
  "How to return a damaged product",
  "How to contact a seller",
  "Delivery delay support",
  "Payment issues",
  "Handmade customization queries"
];

export default function Contact() {
  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] bg-[#fff0df] p-8 shadow-soft dark:bg-white/10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-rose-500">Support</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">Contact Akriti</h1>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-200">Need help with orders, sellers, payments, or handmade customization requests? Our support team is here to assist you.</p>
          <div className="mt-6 grid gap-3">
            <p className="flex items-center gap-3 font-bold"><FiMail /> hello@akriti.com</p>
            <p className="flex items-center gap-3 font-bold"><FiPhone /> +91 98765 43210</p>
            <p className="flex items-center gap-3 font-bold"><FiMapPin /> Pune, Maharashtra</p>
          </div>
          <div className="mt-6 flex gap-3">
            {[FiMail, FiPhone, FaInstagram, FaLinkedin].map((Icon, index) => <a title="Contact icon" key={index} href="#" className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:-translate-y-1 dark:bg-white/10 dark:text-white"><Icon /></a>)}
          </div>
        </div>
        <form className="glass-card grid gap-4 rounded-[30px] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input required placeholder="Name" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
            <input required placeholder="Email" type="email" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
            <input required placeholder="Mobile number" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
            <select required className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10">
              <option value="">Select query type</option>
              {queryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </div>
          <textarea required placeholder="Describe your query" className="min-h-36 rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
          <button className="pill-button bg-ink text-white dark:bg-pastelPink dark:text-ink">Send message</button>
        </form>
      </section>
      <section className="container-soft pb-14">
  <div className="grid gap-4 md:grid-cols-5">

    {/* CARD 1 */}
    <div className="glass-card rounded-[22px] p-5">
      <h2 className="font-black">
        How to return a damaged product
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200">
        If your product arrives damaged, you can request a return or replacement within 48 hours of delivery through your account or support form.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="glass-card rounded-[22px] p-5">
      <h2 className="font-black">
        How to contact a seller
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200">
        Customers can directly contact sellers for product details, customization requests, and order-related queries through the marketplace support system.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="glass-card rounded-[22px] p-5">
      <h2 className="font-black">
        Delivery delay support
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200">
        Facing delivery delays? Our support team will help you track your order and provide updates as quickly as possible.
      </p>
    </div>

    {/* CARD 4 */}
    <div className="glass-card rounded-[22px] p-5">
      <h2 className="font-black">
        Payment issues
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200">
        For payment failures, refunds, or transaction-related problems, contact our support team for quick assistance and secure resolution.
      </p>
    </div>

    {/* CARD 5 */}
    <div className="glass-card rounded-[22px] p-5">
      <h2 className="font-black">
        Handmade customization queries
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200">
        Need personalized handmade products? Connect with sellers to discuss custom colors, designs, sizes, and special requests.
      </p>
    </div>

  </div>
</section>
    </PageTransition>
  );
}
