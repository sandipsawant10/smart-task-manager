import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Loader2 } from "lucide-react";
import { register } from "../services/authApi";

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
      const result = await register(email, password);
      if (result.token) {
        localStorage.setItem("token", result.token);
        if (result.user)
          localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/login");
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <header className="auth-header">
          <div className="auth-logo">
            <span className="auth-logo-mark" />
            Promptiva
          </div>
        </header>

        <div className="auth-body">
          <div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Start managing your tasks smarter.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-field">
              <label>Email</label>
              <input
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <div className="auth-field">
              <label>Confirm Password</label>
              <input
                className="auth-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
            </div>

            <button className="auth-btn" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link className="auth-link" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
