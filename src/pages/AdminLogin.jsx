import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLayout from "../components/auth/AuthLayout";
import InputField from "../components/auth/InputField";
import PasswordInput from "../components/auth/PasswordInput";
import { loginAdmin } from "../utils/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "admin@pastelnest.in", password: "admin123" });
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const session = loginAdmin(form);
    if (!session) {
      setError("Invalid admin credentials");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-xl">
        <AuthCard title="Admin Login" subtitle="Secure dashboard access for marketplace operations." side="left">
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <InputField label="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            <PasswordInput label="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
            {error && <p className="rounded-2xl bg-rose-100 px-4 py-3 text-sm font-bold text-rose-700">{error}</p>}
            <button className="pill-button bg-primary">Login to admin</button>
          </form>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
