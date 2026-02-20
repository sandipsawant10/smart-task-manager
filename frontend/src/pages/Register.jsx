import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  Loader2,
  Zap,
  Cloud,
  Shield,
} from "lucide-react";
import { registerUser } from "../services/authApi";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const result = await registerUser(email, password);
      if (result.success) {
        navigate("/login");
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Get Started Free",
      description: "No credit card required to begin",
    },
    {
      icon: Cloud,
      title: "Sync Everywhere",
      description: "Access your tasks from any device",
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your data is always encrypted and secure",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="grid w-full max-w-6xl gap-12 lg:grid-cols-2">
        {/* Left Column - Feature Cards */}
        <div className="hidden flex-col justify-center lg:flex">
          <div className="space-y-10">
            <div>
              <h1 className="font-instrument-sans text-5xl font-bold leading-tight text-slate-950">
                Get Started with
                <br />
                <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Smart Tasks
                </span>
              </h1>
              <p className="font-inter mt-5 text-lg text-slate-600">
                Join thousands of users getting more done with AI-powered task
                management.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group rounded-lg border border-slate-200/60 bg-white/60 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 to-blue-100 ring-1 ring-sky-200/50">
                        <Icon className="h-5 w-5 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-instrument-sans font-semibold text-slate-900">
                          {feature.title}
                        </h3>
                        <p className="font-inter mt-1 text-xs text-slate-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Register Form */}
        <div className="flex flex-col justify-center">
          <div className="rounded-lg border border-slate-200/60 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <div className="mb-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 shadow-sm">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-instrument-sans text-3xl font-bold text-slate-950">
                Create Account
              </h2>
              <p className="font-inter mt-2 text-sm text-slate-600">
                Join us and start managing tasks smarter
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-lg border border-red-200/50 bg-red-50/60 p-4 font-inter text-xs text-red-700 backdrop-blur-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="font-instrument-sans block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-inter w-full rounded-lg border border-slate-200/60 bg-white/50 pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-400/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200/60 transition-all duration-200 disabled:opacity-50"
                    placeholder="you@example.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="font-instrument-sans block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-inter w-full rounded-lg border border-slate-200/60 bg-white/50 pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-400/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200/60 transition-all duration-200 disabled:opacity-50"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="font-instrument-sans block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="font-inter w-full rounded-lg border border-slate-200/60 bg-white/50 pl-11 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-400/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200/60 transition-all duration-200 disabled:opacity-50"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 font-instrument-sans text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <p className="font-inter mt-6 text-center text-xs text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-sky-600 transition-colors hover:text-sky-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
