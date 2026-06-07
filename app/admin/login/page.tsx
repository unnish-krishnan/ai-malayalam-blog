"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Zap, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.ok) {
      router.push("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-ui text-text-primary">AI Malayalam Admin</h1>
          <p className="text-text-secondary font-ui mt-1 text-sm">Sign in to manage your articles</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-border p-8 shadow-sm space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-ui rounded-xl p-3">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold font-ui text-text-primary mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-border rounded-xl font-ui focus:outline-none focus:border-primary focus:ring-2 focus:ring-light-blue"
              placeholder="admin@techkerala.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold font-ui text-text-primary mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-border rounded-xl font-ui focus:outline-none focus:border-primary focus:ring-2 focus:ring-light-blue"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-ui font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <Lock size={18} />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs font-ui text-gray-mid mt-6">
          Default: admin@techkerala.com / password
        </p>
      </div>
    </div>
  );
}
