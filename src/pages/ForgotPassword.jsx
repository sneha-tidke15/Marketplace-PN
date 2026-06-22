import { useEffect, useMemo, useState } from "react";
import { FiCheckCircle, FiRefreshCw, FiSmartphone } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";
import AuthLayout from "../components/auth/AuthLayout";
import InputField from "../components/auth/InputField";
import PasswordInput from "../components/auth/PasswordInput";
import { useShop } from "../context/ShopContext";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { requestPasswordOtp, verifyPasswordOtp, resetPasswordWithOtp } = useShop();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const secondsLeft = Math.max(0, Math.ceil((expiresAt - now) / 1000));
  const formattedTime = useMemo(() => `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`, [secondsLeft]);

  const sendOtp = (event) => {
    event?.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10 digit Indian mobile number");
      return;
    }
    const result = requestPasswordOtp(phone);
    if (!result) {
      setError("No account found for this mobile number");
      return;
    }
    setError("");
    setExpiresAt(result.expiresAt);
    setStep("otp");
  };

  const verifyOtp = (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6 digit OTP");
      return;
    }
    if (verifyPasswordOtp({ phone, otp })) {
      setError("");
      setStep("reset");
    } else {
      setError("OTP verification failed");
    }
  };

  const resetPassword = (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (resetPasswordWithOtp({ phone, password })) navigate("/login");
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-xl">
        <AuthCard title="Mobile Password Recovery" subtitle="Reset your password with mobile OTP verification." side="left">
          <div className="mt-6 grid grid-cols-3 gap-2 text-xs font-black">
            {["Mobile", "OTP", "Reset"].map((label, index) => (
              <div key={label} className={`rounded-full px-3 py-2 text-center ${["phone", "otp", "reset"].indexOf(step) >= index ? "bg-primary text-white" : "bg-white/70 text-text-secondary"}`}>{label}</div>
            ))}
          </div>

          {step === "phone" && (
            <form onSubmit={sendOtp} className="mt-6 grid gap-4">
              <InputField label="Mobile Number" inputMode="numeric" maxLength={10} value={phone} error={error} onChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))} />
              <button className="pill-button bg-primary"><FiSmartphone /> Send OTP</button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verifyOtp} className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-white/70 p-4 text-sm font-bold text-text-secondary">OTP sent to +91 {phone}. It expires in <span className="text-primary">{formattedTime}</span>.</div>
              <InputField label="Enter OTP" inputMode="numeric" maxLength={6} value={otp} error={error} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} />
              <div className="flex flex-wrap gap-3">
                <button disabled={secondsLeft === 0} className="pill-button bg-primary disabled:opacity-60"><FiCheckCircle /> Verify OTP</button>
                <button type="button" onClick={sendOtp} disabled={secondsLeft > 0} className="pill-button bg-white disabled:opacity-60"><FiRefreshCw /> Resend OTP</button>
              </div>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={resetPassword} className="mt-6 grid gap-4">
              <PasswordInput label="New Password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <PasswordInput label="Confirm Password" value={confirmPassword} error={error} onChange={(event) => setConfirmPassword(event.target.value)} />
              <button className="pill-button bg-primary">Reset password</button>
            </form>
          )}

          <div className="mt-6 flex justify-center gap-4 text-sm font-bold">
            <Link to="/login" className="text-rose-500">Customer login</Link>
            <Link to="/seller-login" className="text-rose-500">Seller login</Link>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
