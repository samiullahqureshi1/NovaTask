import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { fullName, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 via-purple-100 to-white px-4">
      {/* Logo + Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-lg p-3 mb-4">
          <span className="text-white text-2xl font-bold">🌀</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Create your account
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>

      {/* Google Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-sm mb-5"
      >
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
          <FcGoogle size={20} /> <span>Sign up with Google</span>
        </button>
      </motion.div>

      <div className="flex items-center my-4 w-full max-w-sm">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="mx-3 text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-sm space-y-3"
      >
        <input
          type="text"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@novatask.io"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-500 text-xs mt-1 text-center">{errorMsg}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition ${
            loading && "opacity-60 cursor-not-allowed"
          }`}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </motion.button>
      </motion.form>

      <p className="text-center text-xs text-gray-400 mt-6 max-w-xs">
        By signing up, you agree to our{" "}
        <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default Signup;
