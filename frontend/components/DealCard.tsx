"use client";

import { motion } from "framer-motion";

export default function DealCard({ deal, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="card-hover border border-slate-200 rounded-lg p-6 cursor-pointer bg-white hover:shadow-lg group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
          {deal.title}
        </h3>
        {deal.locked && (
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-lg"
          >
            🔒
          </motion.span>
        )}
      </div>

      <p className="text-sm text-slate-500 mb-3">{deal.category}</p>
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{deal.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {deal.partner}
        </span>

        {deal.locked && (
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-red-500 font-semibold"
          >
            Verification required
          </motion.span>
        )}
      </div>

      <motion.div
        className="mt-4 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <p className="text-xs text-slate-400">Click to view details →</p>
      </motion.div>
    </motion.div>
  );
}
