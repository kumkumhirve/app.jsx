import { useState } from "react";
import "./App.css";

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // 🔹 Store users (dummy database)
  const [users, setUsers] = useState([
    { email: "admin@test.com", password: "1234", name: "Admin User" },
  ]);

  // 🔹 For signup input states
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");

  return (
    <div className="login-container">
      <div className="login-card">
        {isSignup ? (
          // 🔹 Sign Up Form
          <>
            <h2 className="login-title">Sign Up</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                // Check if user already exists
                const exists = users.some((u) => u.email === signupEmail);

                if (exists) {
                  alert("⚠️ Account already exists! Please login.");
                } else {
                  // Add new user
                  setUsers([
                    ...users,
                    { email: signupEmail, password: signupPassword, name: signupName },
                  ]);
                  alert("✅ Account Created!");
                  setIsSignup(false); // Go back to login
                }
              }}
            >
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                Sign Up
              </button>
            </form>
            <p className="signup-text">
              Already have an account?{" "}
              <button className="link-btn" onClick={() => setIsSignup(false)}>
                Login
              </button>
            </p>
          </>
        ) : isForgotPassword ? (
          // 🔹 Forgot Password Form
          <>
            <h2 className="login-title">Forgot Password</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("📩 Password reset link sent to your email!");
              }}
            >
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <button type="submit" className="login-btn">
                Send Reset Link
              </button>
            </form>
            <p className="signup-text">
              Remembered your password?{" "}
              <button
                className="link-btn"
                onClick={() => setIsForgotPassword(false)}
              >
                Login
              </button>
            </p>
          </>
        ) : (
          // 🔹 Login Form
          <>
            <h2 className="login-title">Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target[0].value;
                const password = e.target[1].value;

                const user = users.find(
                  (u) => u.email === email && u.password === password
                );

                if (user) {
                  alert(`✅ Welcome, ${user.name}!`);
                } else {
                  alert("❌ Invalid credentials!");
                }
              }}
            >
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter password" required />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
            <p className="signup-text">
              <button
                className="link-btn"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </p>
            <p className="signup-text">
              Don't have an account?{" "}
              <button className="link-btn" onClick={() => setIsSignup(true)}>
                Sign Up
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
