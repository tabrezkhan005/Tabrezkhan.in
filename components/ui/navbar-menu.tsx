"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Transition config for dropdown animation
const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
};

// HoveredLink: Styled anchor for dropdown links
export const HoveredLink = ({ children, ...rest }: any) => (
  <a
    {...rest}
    className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white px-2 py-1 rounded transition-colors"
  >
    {children}
  </a>
);

// MenuItem: Each top-level nav item, can have dropdown children
export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => (
  <div onMouseEnter={() => setActive(item)} className="relative">
    <motion.p
      transition={{ duration: 0.3 }}
      className="cursor-pointer text-black dark:text-white font-medium px-3 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10"
    >
      {item}
    </motion.p>
    {active !== null && (
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={transition}
      >
        {active === item && children && (
          <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 z-50">
            <motion.div
              transition={transition}
              layoutId="active"
              className="bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
            >
              <motion.div layout className="w-max h-full p-4">
                {children}
              </motion.div>
            </motion.div>
          </div>
        )}
      </motion.div>
    )}
  </div>
);

// Menu: Container for all nav items
export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => (
  <nav
    onMouseLeave={() => setActive(null)}
    className="relative flex justify-center space-x-2 sm:space-x-4"
  >
    {children}
  </nav>
);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];
const VAULT_LINKS = [
  { label: "Guestbook", href: "/guestbook" },
  { label: "Bucket List", href: "/bucket-list" },
  { label: "Links", href: "/links" },
  { label: "Uses", href: "/uses" },
];

// Main Navbar component (default export)
const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  // Helper to check if any vault link is active
  const isVaultActive = VAULT_LINKS.some(link => isActive(link.href));

  return (
    <div
      className={cn(
        // Glassmorphism styles and responsive positioning
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-5xl px-4",
        className
      )}
    >
      <div
        className={
          // Glass effect, dark mode, rounded, shadow, and flex layout
          "backdrop-blur-md bg-white/20 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg flex items-center justify-between px-6 py-3"
        }
      >
        {/* Logo section */}
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
          <span className="text-lg font-bold text-black dark:text-white hidden sm:inline">Tabrez Khan</span>
        </a>
        {/* Main navigation menu with active link highlighting */}
        <Menu setActive={setActive}>
          {NAV_LINKS.map(link => (
            <MenuItem key={link.label} setActive={setActive} active={active} item={link.label}>
              {/* Highlight active link */}
              <a
                href={link.href}
                className={cn(
                  "px-2 py-1 rounded transition-colors",
                  isActive(link.href)
                    ? "bg-black/10 dark:bg-white/20 text-black dark:text-white font-semibold underline underline-offset-4"
                    : "text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                )}
              >
                {link.label}
              </a>
            </MenuItem>
          ))}
          {/* Vault dropdown menu with active highlighting if any sub-link is active */}
          <MenuItem setActive={setActive} active={active} item="Vault">
            <div className="flex flex-col space-y-4 text-sm min-w-[160px]">
              {VAULT_LINKS.map(link => (
                <HoveredLink
                  key={link.label}
                  href={link.href}
                  className={cn(
                    isActive(link.href)
                      ? "bg-black/10 dark:bg-white/20 text-black dark:text-white font-semibold underline underline-offset-4"
                      : ""
                  )}
                >
                  {link.label}
                </HoveredLink>
              ))}
            </div>
          </MenuItem>
          {/* Highlight Vault tab if any vault sub-link is active */}
          <MenuItem setActive={setActive} active={active} item="Schedule a Meet">
            <a
              href="#schedule"
              className={cn(
                "px-2 py-1 rounded transition-colors text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              Schedule a Meet
            </a>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
