"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, User, Briefcase, Github, Globe } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginPageProps {
  onLogin: (role: "client" | "lawyer") => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState<"client" | "lawyer">("client");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"credentials" | "oauth">("credentials");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (username && password) {
        document.cookie = "auth=true; path=/";
        onLogin(selectedRole);
        router.push('/dashboard');
      } else {
        setError("Please enter both username and password");
      }
    } catch (error) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Golden Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#c7a44a]/10 via-transparent to-transparent"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-block mb-4"
            >
              <Scale className="h-16 w-16 text-[#c7a44a]" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to LegalAI</h1>
            <p className="text-gray-400">Sign in to access your dashboard</p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl"
          >
            {/* Tab Selection */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setActiveTab("credentials")}
                className={`flex-1 py-3 rounded-xl transition-colors ${
                  activeTab === "credentials"
                    ? "bg-[#c7a44a] text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Email & Password
              </button>
              <button
                onClick={() => setActiveTab("oauth")}
                className={`flex-1 py-3 rounded-xl transition-colors ${
                  activeTab === "oauth"
                    ? "bg-[#c7a44a] text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Single Sign-On
              </button>
            </div>

            {activeTab === "credentials" ? (
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole("client")}
                    className={`p-4 rounded-xl flex flex-col items-center gap-3 transition-colors ${
                      selectedRole === "client"
                        ? "bg-[#c7a44a] text-black"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    <User className="h-6 w-6" />
                    <span className="text-sm font-medium">Client</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole("lawyer")}
                    className={`p-4 rounded-xl flex flex-col items-center gap-3 transition-colors ${
                      selectedRole === "lawyer"
                        ? "bg-[#c7a44a] text-black"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    <Briefcase className="h-6 w-6" />
                    <span className="text-sm font-medium">Lawyer</span>
                  </motion.button>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email address"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c7a44a]/50 focus:border-[#c7a44a] transition-all placeholder:text-gray-500"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#c7a44a]/50 focus:border-[#c7a44a] transition-all placeholder:text-gray-500"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full bg-[#c7a44a] text-black rounded-xl py-3 font-medium hover:bg-[#e0b854] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full mx-auto"
                    />
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </form>
            ) : (
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOAuthSignIn("github")}
                  className="w-full bg-white/5 hover:bg-white/10 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2"
                >
                  <Github className="h-5 w-5" />
                  Continue with GitHub
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOAuthSignIn("google")}
                  className="w-full bg-white/5 hover:bg-white/10 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2"
                >
                  <Globe className="h-5 w-5" />
                  Continue with Google
                </motion.button>
              </div>
            )}

            {/* Footer Links */}
            <div className="text-center text-sm text-gray-400 mt-6">
              <a href="#" className="hover:text-[#c7a44a] transition-colors">
                Forgot password?
              </a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-[#c7a44a] transition-colors">
                Contact support
              </a>
            </div>
          </motion.div>

          {/* Terms and Privacy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-sm text-gray-500 mt-8"
          >
            By signing in, you agree to our{" "}
            <a href="#" className="text-[#c7a44a] hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-[#c7a44a] hover:underline">Privacy Policy</a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}