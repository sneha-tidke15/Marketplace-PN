import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";
import FloatingActions from "../components/FloatingActions";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import StartupLoader from "../components/StartupLoader";
import { Toaster } from "react-hot-toast";


export default function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="page-shell">
      <ScrollToTop />
      <AnimatePresence>{loading && <StartupLoader />}</AnimatePresence>
      <Navbar />
      <main className="pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingActions />
      <MobileBottomNav />
      <Toaster position="top-center" />
    </div>
  );
}
