import { useState } from "react";
import { Shield, Lock, Mail, AlertCircle } from "lucide-react";
import { loginUser } from "../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(
        email,
        password
      );

      console.log("Login successful:", data);

      onLogin(data);

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Logo */}

        <div className="login-logo">
          <div className="login-logo-icon">
            <Shield size={30} />
          </div>

          <div>
            <h1>SafeLens</h1>
            <p>Response Center</p>
          </div>
        </div>


        {/* Heading */}

        <div className="login-heading">

          <h2>
            Welcome Back
          </h2>

          <p>
            Sign in to access the emergency
            response dashboard.
          </p>

        </div>


        {/* Error */}

        {error && (
          <div className="login-error">

            <AlertCircle size={18} />

            <span>
              {error}
            </span>

          </div>
        )}


        {/* Form */}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="login-field">

            <label>
              Email
            </label>

            <div className="input-wrapper">

              <Mail size={18} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

          </div>


          {/* Password */}

          <div className="login-field">

            <label>
              Password
            </label>

            <div className="input-wrapper">

              <Lock size={18} />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

          </div>


          {/* Login */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>

        </form>


        {/* Footer */}

        <div className="login-footer">

          <Shield size={15} />

          <span>
            SafeLens Emergency Response System
          </span>

        </div>

      </div>

    </div>
  );
}

export default Login;