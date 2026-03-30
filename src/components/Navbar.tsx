"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dataset", label: "Dataset" },
  { href: "/configure", label: "Configure" },
  { href: "/experiment", label: "Experiment" },
  { href: "/results", label: "Results" },
  { href: "/hallucination", label: "Hallucinations" },
  { href: "/insights", label: "Insights" },
  { href: "/ethics", label: "Ethics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-all">
            <Zap size={14} className="text-accent" />
          </div>
          <span className="font-display font-bold text-sm text-white tracking-wide">
            LLM<span className="text-accent">Lab</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  active
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-dim hover:text-text hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <button
          className="md:hidden text-dim hover:text-text"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded text-sm font-mono transition-all ${
                  active ? "bg-accent/10 text-accent" : "text-dim hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}