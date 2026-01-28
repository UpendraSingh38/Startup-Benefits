"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api.ts";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import DealCard from "@/components/DealCard";

export default function Deals(): React.ReactNode {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await api("/deals");
        setDeals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch deals");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Loading deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 text-center"
      >
        <p className="text-red-500 text-lg">❌ Error: {error}</p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-8 px-8"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">SaaS Deals</h1>
        <p className="text-slate-600">Discover exclusive deals for startups</p>
      </motion.div>

      {deals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <p className="text-slate-500 text-lg">No deals available yet</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8"
        >
          {deals.map((deal: any, index: number) => (
            <Link key={deal._id} href={`/deals/${deal._id}`}>
              <DealCard deal={deal} index={index} />
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
