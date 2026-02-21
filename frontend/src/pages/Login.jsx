import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Loader2 } from "lucide-react";
import { login } from "../services/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.token) {
        localStorage.setItem("token", result.token);
        if (result.user)
          localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
      } else {
        setError(result.message || "Login failed. Please try again.");
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
            <h1 className="auth-title">Login</h1>
            <p className="auth-subtitle">Hi, welcome back.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleLogin}>
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

            <div className="auth-row">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <span className="auth-link">Forgot Password?</span>
            </div>

            <button className="auth-btn" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn />
                  Login
                </>
              )}
            </button>
          </form>

          <p className="auth-footer">
            Not registered yet?{" "}
            <Link className="auth-link" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
