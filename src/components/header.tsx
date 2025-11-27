"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">R</span>
          </div>
          <span className="hidden sm:inline">RepairOrReplace</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className={`transition-colors hover:text-foreground ${
              pathname === "/" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Calculator
          </Link>
          <Link
            href="/about"
            className={`transition-colors hover:text-foreground ${
              pathname === "/about" ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
