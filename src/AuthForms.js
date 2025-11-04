// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";
// import { HiOutlineCloud } from "react-icons/hi";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:5000/auth/signIn", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Invalid credentials");

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userid", data.user._id);
//       if (data.user.employeeRef) localStorage.setItem("employeeId", data.user.employeeRef);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);
//       setErrorMsg(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 via-purple-100 to-white px-4">
//       {/* Logo */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex flex-col items-center mb-6"
//       >
//         <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-lg p-3 mb-4">
//           <span className="text-white text-2xl font-bold">🌀</span>
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
//         <p className="text-gray-500 text-sm mt-1">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </motion.div>

//       {/* Social Buttons */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.1 }}
//         className="w-full max-w-sm space-y-3"
//       >
//         <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
//           <FcGoogle size={20} /> <span>Continue with Google</span>
//         </button>
//         <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition">
//           <HiOutlineCloud size={20} /> <span>Continue with SSO</span>
//         </button>
//       </motion.div>

//       <div className="flex items-center my-4 w-full max-w-sm">
//         <div className="flex-grow border-t border-gray-200"></div>
//         <span className="mx-3 text-gray-400 text-sm">or</span>
//         <div className="flex-grow border-t border-gray-200"></div>
//       </div>

//       {/* Form */}
//       <motion.form
//         onSubmit={handleLogin}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//         className="w-full max-w-sm space-y-3"
//       >
//         <input
//           type="email"
//           id="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="you@novatask.io"
//           className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           required
//         />

//         <div>
//           <input
//             type="password"
//             id="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
//               errorMsg ? "border-red-400" : "border-gray-300"
//             }`}
//             required
//           />
//           {errorMsg && (
//             <p className="text-red-500 text-xs mt-1">{errorMsg}</p>
//           )}
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.97 }}
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition ${
//             loading && "opacity-60 cursor-not-allowed"
//           }`}
//         >
//           {loading ? "Logging in..." : "Log In"}
//         </motion.button>
//       </motion.form>

//       {/* Footer */}
//       <div className="mt-3">
//         <Link to="#" className="text-blue-600 text-sm hover:underline">
//           Forgot Password?
//         </Link>
//       </div>

//       <p className="text-center text-xs text-gray-400 mt-6 max-w-xs">
//         By continuing, you agree to our{" "}
//         <span className="underline">Terms of Service</span> and{" "}
//         <span className="underline">Privacy Policy</span>.
//       </p>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineCloud } from "react-icons/hi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid credentials");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userid", data.user._id);
      if (data.user.employeeRef)
        localStorage.setItem("employeeId", data.user.employeeRef);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 text-gray-200">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 rounded-lg p-3 mb-4 shadow-md shadow-indigo-900/40">
          <span className="text-white text-2xl font-bold">🌀</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
        <p className="text-gray-400 text-sm mt-1">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>

      {/* Social Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-sm space-y-3"
      >
        <button className="w-full flex items-center justify-center gap-2 border border-gray-700 rounded-md py-2 bg-gray-900/70 hover:bg-gray-800 transition text-gray-200">
          <FcGoogle size={20} /> <span>Continue with Google</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 border border-gray-700 rounded-md py-2 bg-gray-900/70 hover:bg-gray-800 transition text-gray-200">
          <HiOutlineCloud size={20} /> <span>Continue with SSO</span>
        </button>
      </motion.div>

      <div className="flex items-center my-4 w-full max-w-sm">
        <div className="flex-grow border-t border-gray-800"></div>
        <span className="mx-3 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-800"></div>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-sm space-y-3"
      >
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@novatask.io"
          className="w-full border border-gray-700 bg-gray-900 text-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
          required
        />

        <div>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full border rounded-md px-3 py-2 bg-gray-900 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 ${
              errorMsg ? "border-red-500" : "border-gray-700"
            }`}
            required
          />
          {errorMsg && (
            <p className="text-red-500 text-xs mt-1">{errorMsg}</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:opacity-90 transition shadow-md shadow-indigo-900/50 ${
            loading && "opacity-60 cursor-not-allowed"
          }`}
        >
          {loading ? "Logging in..." : "Log In"}
        </motion.button>
      </motion.form>

      {/* Footer */}
      <div className="mt-3">
        <Link
          to="#"
          className="text-indigo-400 text-sm hover:underline transition"
        >
          Forgot Password?
        </Link>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6 max-w-xs">
        By continuing, you agree to our{" "}
        <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default Login;
