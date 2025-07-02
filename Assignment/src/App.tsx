import "./App.css";
import HelpDesk from "./components/HelpDesk.tsx";
import SignUpPage from "./components/SignupPage.tsx";
import SignInPage from "./components/SigninPage.tsx";
import ForgotPasswordPage from "./components/ForgetPassword.tsx";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { useState, useEffect } from "react";

function App() {
  // Simple auth state using localStorage (for demo)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for auth status
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, []);

  // Helper to set auth state after login
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/Helpdesk");
  };

  // Helper to logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setShowProfile(false);
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<SignInPage onLogin={handleLogin} />} />
      <Route path="/Signup" element={<SignUpPage />} />
      <Route path="/Forget" element={<ForgotPasswordPage />} />

      <Route
        path="/Helpdesk"
        element={
          isAuthenticated ? (
            <HelpDesk
              onLogout={handleLogout}
              showProfile={showProfile}
              setShowProfile={setShowProfile}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
