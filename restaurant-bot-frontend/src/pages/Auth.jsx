import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/register";

    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
      } else {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("Login successful!");
          navigate("/"); // redirect to homepage
        } else {
          toast.success("Signup successful. Please login!");
          setIsLogin(true);
        }
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-yellow-100 to-white flex items-center justify-center px-4 relative transition-all duration-500">
      <img
        src="/images/restaurant-bg.jpg"
        alt="restaurant"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md border border-orange-100 rounded-3xl shadow-2xl p-8 space-y-6 animate-fade-in">
          <div className="text-center">
            <img
              src="/images/logo.png"
              alt="FoodieBot"
              className="mx-auto w-16 h-16 rounded-full border-2 border-orange-400 shadow-md"
            />
            <h1 className="text-2xl font-bold text-orange-600 mt-2">
              🍽 FoodieBot
            </h1>
          </div>

          <div className="flex justify-center mb-2">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-l-full font-semibold transition-all duration-300 ${
                isLogin
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-r-full font-semibold transition-all duration-300 ${
                !isLogin
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Signup
            </button>
          </div>

          <h2 className="text-xl font-bold text-center text-orange-600">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="transition-opacity duration-300">
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-white rounded font-semibold hover:bg-orange-600 transition"
              disabled={loading}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Creating Account..."
                : isLogin
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

          {/* Google Login UI */}
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600 mb-2">or sign in with</p>
            <button
              type="button"
              onClick={() => toast.info("Coming soon: Google login!")}
              className="w-full py-2 bg-white border border-gray-300 rounded shadow-sm hover:shadow-md flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02]"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
