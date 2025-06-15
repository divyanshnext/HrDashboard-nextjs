"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const features = [
    {
      title: "📊 Analytics Dashboard",
      description: "Visualize performance metrics and team trends.",
    },
    {
      title: "👥 Employee Management",
      description: "Easily manage, search, and update employee records.",
    },
    {
      title: "🔖 Bookmarks",
      description: "Save key profiles for quick access.",
    },
    {
      title: "🌓 Dark Mode",
      description: "Switch themes without losing clarity.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold text-center text-blue-900 dark:text-white mb-6 leading-tight"
      >
        {session ? "Welcome back to HR Dashboard" : "Welcome to HR Dashboard"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl text-center max-w-2xl text-gray-800 dark:text-gray-300 mb-8"
      >
        Streamline employee management with intuitive features like analytics, bookmarks, and modern UI.
      </motion.p>

      {!session && (
        <>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/admin-login")}
            className="mb-12 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            🚀 Get Started
          </motion.button>

          <motion.div
            className="grid md:grid-cols-2 gap-6 w-full max-w-5xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-2xl bg-white dark:bg-[#1f2937] backdrop-blur-lg p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition duration-300 ease-in-out hover:scale-[1.02]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  {feature.title}
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
