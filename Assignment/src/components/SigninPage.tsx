import { useState } from "react";

interface SignInPageProps {
  onLogin?: () => void;
}

export default function SignInPage({ onLogin }: SignInPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("https://assignment-1-zxu9.onrender.com/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signin successful!");
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (onLogin) onLogin();
      } else {
        setMessage(data.error || "Signin failed");
      }
    } catch {
      setMessage("Signin failed");
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#55D6C2] overflow-hidden">
      <div className="w-[1000px] h-[500px] bg-[#efeded80] rounded shadow-md flex flex-col items-center justify-center px-10">
        <h2 className="text-3xl font-bold italic mb-10 text-black font-sanchez">
          Helpdesk System
        </h2>
        <form
          className="flex flex-col gap-6 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-400 rounded bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-gray-400 rounded bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded w-1/2 mx-auto"
          >
            Sign In
          </button>
          {message && (
            <div className="text-center text-red-500 mt-2">{message}</div>
          )}
          <div className="flex justify-between text-sm">
            <a href="/Forget" className="text-red-500 hover:underline">
              Forgot password
            </a>
            <a href="/Signup" className="text-black hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
