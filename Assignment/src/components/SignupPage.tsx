import { useState } from "react";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(
        "https://assignment-1-zxu9.onrender.com/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! Please sign in.");
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch {
      setMessage("Signup failed");
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#55D6C2]">
      <div className="w-[700px] h-[600px] bg-[#efeded80] rounded shadow-md flex flex-col items-center justify-center px-10">
        <h2 className="text-3xl font-bold italic mb-2 text-black font-sanchez">
          Helpdesk System
        </h2>
        <p className="text-md text-black mb-6">Sign up here</p>
        <form
          className="flex flex-col gap-4 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 border border-gray-400 rounded bg-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded w-1/2 mx-auto"
          >
            Sign Up
          </button>
          {message && (
            <div className="text-center text-red-500 mt-2">{message}</div>
          )}
          <div className="flex justify-between text-sm">
            <a href="/Forget" className="text-red-500 hover:underline">
              Forgot password
            </a>
            <a href="/" className="text-black hover:underline">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
