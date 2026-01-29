"use client";
import { api } from "@/lib/api.ts";
import { useEffect, useState } from "react";
import React, { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link"

export default function Deal({ params }: { params: Promise<{ id: string }> }): React.ReactNode {
  const resolvedParams = use(params);
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        if (!resolvedParams.id) {
          setError("Deal ID is required");
          return;
        }
        const data = await api(`/deals/${resolvedParams.id}`);
        setDeal(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch deal");
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4"
      >
        <div className="text-center">
          <p className="text-red-400 text-2xl mb-6">❌ Error: {error}</p>
          <Link href="/deals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Deals
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  if (!deal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4"
      >
        <div className="text-center">
          <p className="text-slate-300 text-2xl mb-6">😕 Deal not found</p>
          <Link href="/deals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Deals
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Design: "from-pink-500 to-rose-500",
      Payments: "from-green-500 to-emerald-500",
      Cloud: "from-blue-500 to-cyan-500",
      Development: "from-purple-500 to-indigo-500",
      Productivity: "from-yellow-500 to-orange-500",
      Communication: "from-red-500 to-pink-500",
    };
    return colors[category] || "from-slate-500 to-slate-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="sticky top-0 z-50 backdrop-blur-sm bg-slate-900 bg-opacity-50 border-b border-slate-700 px-8 py-4"
      >
        <Link href="/deals">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
          >
            ← Back to Deals
          </motion.button>
        </Link>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 py-12"
      >
        {/* Header with Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  className={`text-4xl`}
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {deal.locked ? "🔒" : "🎁"}
                </motion.span>
                <h1 className="text-5xl font-black text-white leading-tight">{deal.title}</h1>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-3">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-full font-bold text-white bg-gradient-to-r ${getCategoryColor(
                    deal.category
                  )}`}
                >
                  {deal.category}
                </motion.span>

                {deal.locked ? (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-4 py-2 rounded-full font-bold text-white bg-red-600"
                  >
                    🔐 Verification Required
                  </motion.span>
                ) : (
                  <motion.span
                    className="px-4 py-2 rounded-full font-bold text-white bg-green-600"
                    animate={{ backgroundPosition: "200% center" }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ✨ Exclusive Deal
                  </motion.span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 mb-8 shadow-2xl hover:shadow-blue-500/20 transition-shadow"
        >
          {/* Description */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">About This Deal</h2>
            <p className="text-lg text-slate-300 leading-relaxed">{deal.description}</p>
          </motion.div>

          {/* Details Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 py-8 border-y border-slate-700">
            {[
              { icon: "🏢", label: "Partner", value: deal.partner },
              { icon: "📂", label: "Category", value: deal.category },
              { icon: "⭐", label: "Status", value: deal.locked ? "Locked" : "Available" },
              { icon: "💰", label: "Benefit", value: "Exclusive pricing" },
            ].map((detail, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="bg-slate-700 bg-opacity-50 rounded-lg p-4"
              >
                <div className="text-3xl mb-2">{detail.icon}</div>
                <p className="text-slate-400 text-sm">{detail.label}</p>
                <p className="text-white font-bold text-lg">{detail.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                deal.locked
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg"
              }`}
              disabled={deal.locked}
            >
              {deal.locked ? "🔒 Verify to Claim" : "✨ Claim This Deal"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-4 px-6 border-2 border-slate-500 text-slate-300 rounded-lg font-bold hover:border-blue-400 hover:text-blue-400 transition-colors"
            >
              📋 Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Related Info */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              title: "🎯 How to Claim",
              description: "Click the claim button to activate this exclusive offer for your startup.",
            },
            {
              title: "⏰ Valid Until",
              description: "This deal is valid until further notice. Claim it today!",
            },
          ].map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-3">{info.title}</h3>
              <p className="text-slate-400">{info.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
