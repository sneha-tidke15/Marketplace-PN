import { motion } from "framer-motion";

export default function StartupLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="pastel-gradient fixed inset-0 z-[100] grid place-items-center overflow-hidden"
    >
      <motion.span animate={{ y: [0, -22, 0], x: [0, 14, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-10 top-20 h-44 w-44 rounded-full bg-pastelPink/70 blur-3xl" />
      <motion.span animate={{ y: [0, 18, 0], x: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute right-12 top-28 h-52 w-52 rounded-full bg-pastelBlue/80 blur-3xl" />
      <motion.span animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity }} className="absolute bottom-16 left-1/3 h-40 w-40 rounded-full bg-lavender/80 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glass-card rounded-[38px] px-10 py-12 text-center shadow-glow"
      >
        <motion.h1
          animate={{ letterSpacing: ["0.08em", "0.18em", "0.08em"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl font-black md:text-6xl"
        >
          PASTELNEST
        </motion.h1>
        <motion.p animate={{ opacity: [0.65, 1, 0.65] }} transition={{ duration: 2, repeat: Infinity }} className="mt-4 text-lg font-extrabold text-rose-500">
          Handmade with Love 💖
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
