import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

export default function Contact() {
  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="text-5xl font-black">Contact PastelNest</h1>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-200">Questions about sellers, products, or project presentation? Send a message and the friendly UI will pretend to help instantly.</p>
          <div className="mt-6 flex gap-3">
            {[FiMail, FiPhone, FaInstagram, FaLinkedin].map((Icon, index) => <a key={index} href="#" className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-pastelPink to-pastelBlue shadow-sm transition hover:-translate-y-1"><Icon /></a>)}
          </div>
        </div>
        <form className="glass-card grid gap-4 rounded-[34px] p-6">
          <input placeholder="Name" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
          <input placeholder="Email" className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
          <textarea placeholder="Message" className="min-h-36 rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
          <button className="pill-button bg-ink text-white dark:bg-pastelPink dark:text-ink">Send message</button>
        </form>
      </section>
      <section className="container-soft pb-14">
        <h2 className="mb-5 text-3xl font-black">FAQ</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {["Is this a real backend store?", "Can sellers add products?", "Is checkout real?"].map((question) => <details key={question} className="glass-card rounded-[24px] p-5"><summary className="cursor-pointer font-black">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-200">This frontend-only project uses dummy JSON data and Context API for demo interactions.</p></details>)}
        </div>
      </section>
    </PageTransition>
  );
}
