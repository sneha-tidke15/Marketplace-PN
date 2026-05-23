import { useState } from "react";
import { FiCheckCircle, FiGift } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLayout from "../components/auth/AuthLayout";
import InputField from "../components/auth/InputField";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import { useShop } from "../context/ShopContext";

export default function Register() {
  const { register, login, showToast } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "", address: "" });
  const [errors, setErrors] = useState({});

  const update = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Full name is required";
    if (!form.email.includes("@")) nextErrors.email = "Enter a valid email address";
    if (form.phone.length < 10) nextErrors.phone = "Enter a 10 digit phone number";
    if (form.password.length < 6) nextErrors.password = "Use at least 6 characters";
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = "Passwords do not match";
    if (!form.address.trim()) nextErrors.address = "Address is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (register({ name: form.name, email: form.email, phone: form.phone, password: form.password, address: form.address, role: "customer" })) {
      navigate("/customer-dashboard");
    }
  };

  return (
    <AuthLayout>
      <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <AuthCard title="Customer Register" subtitle="Create a customer profile for faster checkout, wishlists, and order tracking." side="left">
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <InputField label="Full Name" value={form.name} error={errors.name} onChange={(event) => update("name", event.target.value)} />
              <InputField label="Email" type="email" value={form.email} error={errors.email} onChange={(event) => update("email", event.target.value)} />
              <InputField label="Phone Number" value={form.phone} error={errors.phone} onChange={(event) => update("phone", event.target.value)} />
              <PasswordInput label="Password" value={form.password} error={errors.password} onChange={(event) => update("password", event.target.value)} />
              <PasswordInput label="Confirm Password" value={form.confirmPassword} error={errors.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} />
            </div>
            <InputField label="Address" as="textarea" rows="4" value={form.address} error={errors.address} onChange={(event) => update("address", event.target.value)} />
            <button className="pill-button bg-gradient-to-r from-pastelPink via-lavender to-pastelBlue text-ink hover:scale-[1.02]">Register</button>
          </form>
          <div className="mt-5"><SocialLoginButtons onSocialLogin={(provider) => { login({ email: `customer@${provider.toLowerCase()}.demo`, role: "customer" }); showToast(`${provider} customer signup successful`); navigate("/customer-dashboard"); }} /></div>
          <p className="mt-6 text-center text-sm font-semibold">Already have an account? <Link to="/login" className="text-rose-500">Login</Link></p>
        </AuthCard>
        <div className="glass-card rounded-[38px] p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-pastelPink px-4 py-2 text-sm font-black text-rose-600"><FiGift /> Customer perks</span>
          <h2 className="mt-5 text-5xl font-black">Join the cozy craft community</h2>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-200">Discover makers, save handmade pieces, and enjoy a soft premium shopping flow.</p>
          <div className="mt-7 grid gap-4">
            {["Saved wishlist", "Quick checkout UI", "Recently viewed products"].map((item) => (
              <p key={item} className="flex items-center gap-2 font-bold"><FiCheckCircle className="text-emerald-500" /> {item}</p>
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
