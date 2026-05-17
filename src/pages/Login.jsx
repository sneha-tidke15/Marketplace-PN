import { useState } from "react";
import { FiArrowRight, FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLayout from "../components/auth/AuthLayout";
import InputField from "../components/auth/InputField";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import { useShop } from "../context/ShopContext";

export default function Login() {
  const { login, showToast } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.email.includes("@")) nextErrors.email = "Enter a valid email address";
    if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    login({ email: form.email, role: "customer" });
    navigate("/customer-dashboard");
  };

  return (
    <AuthLayout>
      <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[38px] bg-white/45 p-8 backdrop-blur dark:bg-white/10">
          <span className="rounded-full bg-pastelPink px-4 py-2 text-sm font-black text-rose-600">Customer access</span>
          <h1 className="mt-5 text-5xl font-black">Welcome back to PastelNest</h1>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-200">Login to save favorites, track handmade orders, and keep supporting small businesses.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="glass-card rounded-[24px] p-5"><FiHeart className="text-2xl text-rose-500" /><p className="mt-3 font-black">Wishlist favorites</p></div>
            <div className="glass-card rounded-[24px] p-5"><FiShoppingBag className="text-2xl text-rose-500" /><p className="mt-3 font-black">Order history</p></div>
          </div>
        </div>
        <AuthCard title="Customer Login" subtitle="Use your customer account to continue shopping handmade products.">
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <InputField label="Email" type="email" value={form.email} error={errors.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <PasswordInput label="Password" value={form.password} error={errors.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
              <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
              <Link to="/forgot-password" className="text-rose-500">Forgot password?</Link>
            </div>
            <button className="pill-button bg-gradient-to-r from-pastelPink via-lavender to-pastelBlue text-ink hover:scale-[1.02]">Login <FiArrowRight /></button>
          </form>
          <div className="mt-5"><SocialLoginButtons onSocialLogin={(provider) => { login({ email: `customer@${provider.toLowerCase()}.demo`, role: "customer" }); showToast(`${provider} customer login successful`); navigate("/customer-dashboard"); }} /></div>
          <p className="mt-6 text-center text-sm font-semibold">New customer? <Link to="/register" className="text-rose-500">Create account</Link></p>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
