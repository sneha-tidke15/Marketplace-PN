import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import snehaImg from "../assets/SNEHA.jpeg";

export default function DeveloperSection({ onClose }) {

  return (
    <section className="container-soft py-16">
      <div className="relative rounded-[40px] pastel-gradient p-1 shadow-soft">

        {/* BACKGROUND EFFECTS */}
        <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-pastelPink/70 blur-2xl" />
        <div className="absolute bottom-10 right-16 h-28 w-28 rounded-full bg-pastelBlue/80 blur-2xl" />

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card relative rounded-[38px] p-8 text-center md:p-10"
        >

          {/* CLOSE BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:scale-105 hover:bg-red-600"
            >
              Close ✕
            </button>
          </div>

          {/* TITLE */}
          <motion.p
            animate={{
              textShadow: [
                "0 0 0 rgba(255,214,232,0)",
                "0 0 24px rgba(255,214,232,0.9)",
                "0 0 0 rgba(255,214,232,0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-4 text-sm font-black uppercase tracking-[0.28em] text-rose-500"
          >
            Built by AXINEX TECHNOLOGIES
          </motion.p>

          {/* PROFILE CARD */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="mx-auto mt-8 max-w-md rounded-[34px] border border-white/60 bg-white/45 p-7 shadow-soft backdrop-blur-2xl dark:border-white/15 dark:bg-white/10"
          >

            {/* IMAGE */}
            <motion.img
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              src={snehaImg}
              alt="Sneha Tidke"
              className="mx-auto h-44 w-44 rounded-full border-8 border-pastelPink object-cover shadow-glow dark:border-lavender"
            />

            {/* NAME */}
            <h2 className="mt-5 text-3xl font-black">
              Sneha Suresh Tidke
            </h2>

            {/* ROLE */}
            <p className="mt-2 text-sm font-extrabold text-rose-500">
              Frontend Developer and UI Engineer
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-7 flex justify-center gap-3">

              <a
                href="https://www.linkedin.com/in/sneha-tidke15"
                target="_blank"
                rel="noreferrer"
                className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-pastelPink via-lavender to-pastelBlue text-lg text-ink shadow-sm transition hover:-translate-y-1 hover:scale-110 hover:shadow-glow"
                aria-label="LinkedIn profile"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:snehatidke43@gmail.com"
                className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-pastelPink via-lavender to-pastelBlue text-lg text-ink shadow-sm transition hover:-translate-y-1 hover:scale-110 hover:shadow-glow"
                aria-label="Email Sneha"
              >
                <FiMail />
              </a>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}