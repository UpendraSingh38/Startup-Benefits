"use client";
import { api } from "@/lib/api.ts";
import { useEffect, useState } from "react";
import React from "react";

export default function Dashboard(): React.ReactNode {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const data = await api("/claims", token || undefined);
        setClaims(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch claims");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Claims</h1>
      {claims.length === 0 ? (
        <p>No claims yet</p>
      ) : (
        claims.map((c: any) => (
          <div key={c._id} className="border p-4 mb-2">
            {c.deal.title} – {c.status}
          </div>
        ))
      )}
    </div>
  );
}
