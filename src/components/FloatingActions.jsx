import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-30 grid gap-3">
      {visible && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="grid h-14 w-14 place-items-center rounded-full bg-ink p-4 text-xl text-white shadow-soft transition hover:scale-110 dark:bg-pastelPink dark:text-ink" aria-label="Scroll to top">
          <FiArrowUp />
        </button>
      )}
    </div>
  );
}
