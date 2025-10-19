import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUsers, FiTarget, FiClock, FiBarChart2 } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-white text-gray-800 flex flex-col">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-6 md:px-16 py-4 backdrop-blur-sm border-b border-white/30"
      >
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-2 rounded-lg text-white font-bold">
            NT
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-800">NovaTask</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:text-gray-900 font-medium transition"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-5 py-2 rounded-md shadow-sm hover:opacity-90 transition"
          >
            Get Started
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-grow px-6 py-20">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight"
        >
          Organize, Track, <br />
          and Deliver <span className="text-blue-600">with Ease</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-2xl text-gray-600 text-lg"
        >
          NovaTask helps your team stay focused, collaborate seamlessly, and
          achieve goals faster — all inside one smart workspace.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:opacity-90 transition"
          >
            Get Started Free
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-md font-semibold transition">
            Learn More
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-3xl font-extrabold text-gray-800 mb-3"
          >
            Simplify Your Workflow
          </motion.h3>
          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="text-gray-500 mb-12 max-w-xl mx-auto"
          >
            From planning to performance — NovaTask keeps your projects running
            smoothly, efficiently, and beautifully.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="bg-white border border-gray-200 hover:shadow-lg transition rounded-xl p-6 text-left"
            >
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-md inline-flex mb-3">
                <FiUsers className="text-white text-2xl" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Team Collaboration</h4>
              <p className="text-gray-600 text-sm">
                Communicate, assign, and track your team’s work in real time.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
              className="bg-white border border-gray-200 hover:shadow-lg transition rounded-xl p-6 text-left"
            >
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-md inline-flex mb-3">
                <FiClock className="text-white text-2xl" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Time Tracking</h4>
              <p className="text-gray-600 text-sm">
                Keep track of every task hour and improve your team's productivity.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate="visible"
              className="bg-white border border-gray-200 hover:shadow-lg transition rounded-xl p-6 text-left"
            >
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-md inline-flex mb-3">
                <FiTarget className="text-white text-2xl" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Goals & KPIs</h4>
              <p className="text-gray-600 text-sm">
                Set measurable goals and track progress toward your milestones.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={6}
              initial="hidden"
              animate="visible"
              className="bg-white border border-gray-200 hover:shadow-lg transition rounded-xl p-6 text-left"
            >
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-md inline-flex mb-3">
                <FiBarChart2 className="text-white text-2xl" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Analytics & Insights</h4>
              <p className="text-gray-600 text-sm">
                Make data-driven decisions with easy-to-read performance reports.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-center text-white">
        <motion.h4
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold mb-4"
        >
          Boost Your Team’s Productivity with NovaTask
        </motion.h4>
        <motion.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          className="text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Try NovaTask for free today — streamline your workflow, manage smarter, and
          deliver better results.
        </motion.p>
        <motion.button
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="visible"
          onClick={() => navigate("/login")}
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-md shadow-md hover:bg-blue-50 transition"
        >
          Get Started Now
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-200 bg-white/30 backdrop-blur-sm">
        © {new Date().getFullYear()} NovaTask — Designed for Productivity ✨
      </footer>
    </div>
  );
};

export default LandingPage;
