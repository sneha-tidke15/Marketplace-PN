import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiArrowUp, FiMail, FiUsers, FiX } from "react-icons/fi";
import snehaImg from "../assets/SNEHA.jpeg";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-30 grid gap-3">
      {visible && (
        <button title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="grid h-14 w-14 place-items-center rounded-full bg-ink p-4 text-xl text-white shadow-soft transition hover:scale-110 dark:bg-pastelPink dark:text-ink" aria-label="Scroll to top">
          <FiArrowUp />
        </button>
      )}
      <button title="Meet Developers" onClick={() => setTeamOpen(true)} className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-pastelPink to-pastelBlue p-4 text-xl text-ink shadow-soft transition hover:-translate-y-1" aria-label="Meet Developers">
        <FiUsers />
      </button>
      <AnimatePresence>
        {teamOpen && (
          <motion.div className="fixed inset-0 z-50 bg-ink/45 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="ml-auto flex h-full w-full max-w-md flex-col bg-cream p-6 shadow-soft dark:bg-[#201c2a]">
              <button onClick={() => setTeamOpen(false)} className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-sm dark:bg-white/10 dark:text-white" aria-label="Close developers">
                <FiX />
              </button>
              <div className="mt-4 rounded-[28px] bg-white/75 p-5 shadow-soft dark:bg-white/10">
                <img src={snehaImg} alt="Sneha Tidke" className="h-56 w-full rounded-[24px] object-cover object-top" />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-rose-500">Built by AXINEX TECHNOLOGIES</p>
                <h2 className="mt-2 text-3xl font-black">Sneha Suresh Tidke</h2>
                <p className="mt-1 font-bold text-slate-600 dark:text-slate-200">Frontend Developer and UI Engineer</p>
                <div className="mt-5 grid gap-3">
                  <a title="Developer LinkedIn" href="https://www.linkedin.com/in/sneha-tidke15" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-pastelBlue px-4 py-3 font-black text-ink"><FaLinkedin /> LinkedIn</a>
                  <a title="Developer Email" href="mailto:snehatidke43@gmail.com" className="flex items-center gap-3 rounded-2xl bg-pastelPink px-4 py-3 font-black text-ink"><FiMail /> snehatidke43@gmail.com</a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
