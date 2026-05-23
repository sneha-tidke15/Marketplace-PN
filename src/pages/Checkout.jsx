import { FiCreditCard, FiMapPin, FiSmartphone } from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import { useShop } from "../context/ShopContext";

const methods = ["UPI", "COD", "Cards", "Net Banking"];

export default function Checkout() {
  const { cart, cartTotal, showToast, addNotification } = useShop();
  const shipping = cart.length ? 79 : 0;
  const gst = Math.round(cartTotal * 0.05);
  const discount = cart.length ? 100 : 0;
  const finalTotal = cartTotal + shipping + gst - discount;

  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <h1 className="text-4xl font-black">Checkout</h1>
          <form className="glass-card grid gap-4 rounded-[30px] p-6" onSubmit={(event) => { event.preventDefault(); showToast("Order placed successfully"); addNotification("customer", "Order placed notification: your handmade order is confirmed."); addNotification("seller", "New order notification: prepare and ship a customer order."); }}>
            <h2 className="flex items-center gap-2 text-2xl font-black"><FiMapPin /> Delivery address</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {["Full name", "Mobile number", "Alternate mobile number", "Pincode", "City", "Landmark"].map((field) => <input key={field} required={field !== "Alternate mobile number"} placeholder={field} className="rounded-2xl border-0 bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />)}
            </div>
            <textarea required placeholder="House no, area, street, state" className="min-h-28 rounded-2xl border-0 bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
            <h2 className="mt-4 flex items-center gap-2 text-2xl font-black"><FiCreditCard /> Payment method</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {methods.map((method) => <label key={method} className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10"><input name="payment" type="radio" required /> <FiSmartphone /> {method}</label>)}
            </div>
            <button className="pill-button mt-4 bg-ink text-white dark:bg-pastelPink dark:text-ink">Place order</button>
          </form>
        </div>
        <aside className="glass-card h-fit rounded-[30px] p-6">
          <h2 className="text-2xl font-black">Order summary</h2>
          <div className="mt-5 grid gap-4">
            {cart.map((item) => <div key={item.id} className="flex gap-3"><img src={item.images[0]} alt={item.title} loading="lazy" className="h-16 w-16 rounded-xl object-cover" /><div><p className="text-sm font-bold">{item.title}</p><p className="text-xs text-slate-500 dark:text-slate-300">Qty {item.quantity}</p></div></div>)}
          </div>
          <div className="mt-5 grid gap-3 border-t border-white/60 pt-4 text-sm font-semibold">
            <div className="flex justify-between"><span>Product cost</span><span>₹{cartTotal}</span></div>
            <div className="flex justify-between"><span>Shipping charges</span><span>₹{shipping}</span></div>
            <div className="flex justify-between"><span>GST</span><span>₹{gst}</span></div>
            <div className="flex justify-between text-emerald-600"><span>Coupon discount</span><span>-₹{discount}</span></div>
            <div className="flex justify-between border-t border-white/60 pt-4 text-xl font-black"><span>Final total</span><span>₹{finalTotal}</span></div>
          </div>
        </aside>
      </section>
    </PageTransition>
  );
}
