"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b">
      <Link href="/" className="font-semibold">
        StartupBenefits
      </Link>

      <div className="flex gap-6 text-sm">
        <Link href="/deals">Deals</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
