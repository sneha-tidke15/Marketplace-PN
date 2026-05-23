import { useState } from "react";
import { FiAward, FiCamera, FiCheckCircle, FiStar } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLayout from "../components/auth/AuthLayout";
import InputField from "../components/auth/InputField";
import PasswordInput from "../components/auth/PasswordInput";
import { useShop } from "../context/ShopContext";

export default function SellerRegister() {
  const { register, showToast } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({ shopName: "", ownerName: "", email: "", phone: "", password: "", confirmPassword: "", description: "", socials: "" });
  const [errors, setErrors] = useState({});

  const update = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.shopName.trim()) nextErrors.shopName = "Shop name is required";
    if (!form.ownerName.trim()) nextErrors.ownerName = "Owner name is required";
    if (!form.email.includes("@")) nextErrors.email = "Enter a valid email";
    if (form.phone.length < 10) nextErrors.phone = "Enter a 10 digit phone number";
    if (form.password.length < 6) nextErrors.password = "Use at least 6 characters";
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = "Passwords do not match";
    if (!form.description.trim()) nextErrors.description = "Describe your handmade shop";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (register({ name: form.ownerName, shopName: form.shopName, email: form.email, phone: form.phone, password: form.password, description: form.description, socials: form.socials, role: "seller" })) {
      navigate("/seller-dashboard");
    }
  };

  return (
    <AuthLayout>
      <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card rounded-[38px] p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-sm font-black text-emerald-700"><FiAward /> Verified seller badge UI</span>
          <h1 className="mt-5 text-5xl font-black">Launch your pastel shopfront</h1>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-200">Create a seller profile, upload a logo, and start presenting handmade products in a premium multi-seller marketplace.</p>
          <div className="mt-7 grid gap-4">
            {["Build a trusted maker profile", "Showcase shop story and social links", "Access product and order tools"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10"><FiCheckCircle className="text-emerald-500" /> {item}</div>
            ))}
          </div>
        </div>

        <AuthCard title="Seller Register" subtitle="Tell customers who you are and what your small business creates.">
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <label className="grid cursor-pointer place-items-center rounded-[28px] border-2 border-dashed border-pastelPink bg-white/50 p-6 text-center transition hover:bg-pastelPink/40 dark:bg-white/10">
              <FiCamera className="text-3xl text-rose-500" />
              <span className="mt-2 font-black">Upload shop logo</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">Frontend-only upload UI</span>
              <input type="file" className="hidden" accept="image/*" onChange={() => showToast("Shop logo selected")} />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <InputField label="Shop Name" value={form.shopName} error={errors.shopName} onChange={(event) => update("shopName", event.target.value)} />
              <InputField label="Owner Name" value={form.ownerName} error={errors.ownerName} onChange={(event) => update("ownerName", event.target.value)} />
              <InputField label="Email" type="email" value={form.email} error={errors.email} onChange={(event) => update("email", event.target.value)} />
              <InputField label="Phone Number" value={form.phone} error={errors.phone} onChange={(event) => update("phone", event.target.value)} />
              <PasswordInput label="Password" value={form.password} error={errors.password} onChange={(event) => update("password", event.target.value)} />
              <PasswordInput label="Confirm Password" value={form.confirmPassword} error={errors.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} />
            </div>
            <InputField label="Shop Description" as="textarea" rows="4" value={form.description} error={errors.description} onChange={(event) => update("description", event.target.value)} />
            <InputField label="Social Media Links" placeholder="Instagram, website, Facebook..." value={form.socials} onChange={(event) => update("socials", event.target.value)} />
            <button className="pill-button bg-gradient-to-r from-pastelPink via-lavender to-pastelBlue text-ink hover:scale-[1.02]"><FiStar /> Create seller shop</button>
          </form>
          <p className="mt-6 text-center text-sm font-semibold">Already selling? <Link to="/seller-login" className="text-rose-500">Seller login</Link></p>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
