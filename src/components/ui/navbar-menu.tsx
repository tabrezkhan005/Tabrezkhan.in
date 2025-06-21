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

// New Icon Components for the Vault Dropdown
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>
);
const UsesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7.5C10.5 5.5 8 5.5 6.5 7.5C5 9.5 6.5 12.5 12 14.5C17.5 12.5 19 9.5 17.5 7.5C16 5.5 13.5 5.5 12 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const AttributionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// ProjectItem: Card for Projects dropdown
const ProjectItem = ({
  title,
  description,
  href,
  imgSrc,
}: {
  title: string;
  description: string;
  href: string;
  imgSrc: string;
}) => (
  <a
    href={href}
    className="flex items-center gap-6 group"
    style={{ textDecoration: 'none' }}
  >
    <div className="w-40 h-24 rounded-lg overflow-hidden shrink-0 shadow-xl">
        <Image
          src={imgSrc}
          alt={title}
          width={160}
          height={96}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
    </div>
    <div className="flex flex-col">
      <div className="font-bold text-lg text-white mb-1 group-hover:text-neutral-300 transition-colors duration-200">{title}</div>
      <div className="text-base text-neutral-400 leading-snug">{description}</div>
    </div>
  </a>
);

// VaultImageCard: Large card with image background and overlay text
const VaultImageCard = ({
  title,
  description,
  href,
  imgSrc,
}: {
  title: string;
  description: string;
  href: string;
  imgSrc: string;
}) => (
  <a
    href={href}
    className="relative rounded-2xl overflow-hidden h-48 flex items-end shadow-lg group"
    style={{ textDecoration: 'none' }}
  >
    <Image
      src={imgSrc}
      alt={title}
      layout="fill"
      objectFit="cover"
      className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-300"
    />
    <div className="relative z-10 p-5 bg-gradient-to-t from-black/80 to-transparent w-full">
      <div className="font-bold text-xl text-white mb-1">{title}</div>
      <div className="text-sm text-white/90 leading-snug">{description}</div>
    </div>
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-200" />
  </a>
);

// VaultIconLink: Small card with icon, title, and description
const VaultIconLink = ({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    className="flex items-center gap-4 bg-neutral-900 rounded-xl shadow p-4 hover:bg-neutral-800 transition-colors duration-150"
    style={{ textDecoration: 'none' }}
  >
    <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-800 text-2xl text-white">
      {icon}
    </span>
    <div>
      <div className="font-semibold text-white text-base mb-0.5">{title}</div>
      <div className="text-sm text-neutral-400 leading-snug">{description}</div>
    </div>
  </a>
);

// New NAV_LINKS structure based on the image
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "More" }, // This will be the dropdown trigger
];

const VAULT_PRIMARY_LINKS = [
  {
    title: "Guestbook",
    description: "Leave me a message",
    href: "/guestbook",
    imgSrc: "/navbar/guestbook.png",
  },
  {
    title: "Bucket List",
    description: "Things to do in this life",
    href: "/bucket-list",
    imgSrc: "/navbar/bucketlist.png",
  },
];

const VAULT_SECONDARY_LINKS = [
    {
        title: "Links",
        description: "All my links are here",
        href: "/links",
        icon: <LinkIcon />,
    },
    {
        title: "Uses",
        description: "A peek into my digital...",
        href: "/uses",
        icon: <UsesIcon />,
    },
    {
        title: "Attribution",
        description: "Journey to create this site",
        href: "/attribution",
        icon: <AttributionIcon />,
    }
];

const PROJECTS = [
    {
        title: "Algochurn",
        description: "Prepare for tech interviews like never before.",
        href: "https://algochurn.com",
        imgSrc: "https://assets.aceternity.com/demos/algochurn.webp",
    },
    {
        title: "Tailwind Master Kit",
        description: "Production ready Tailwind css components for your next project",
        href: "https://tailwindmasterkit.com",
        imgSrc: "https://assets.aceternity.com/demos/tailwindmasterkit.webp",
    },
    {
        title: "Moonbeam",
        description: "Never write from scratch again. Go from idea to blog in minutes.",
        href: "https://gomoonbeam.com",
        imgSrc: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png",
    },
    {
        title: "Rogue",
        description: "Respond to government RFPs, RFIs and RFQs 10x faster using AI",
        href: "https://userogue.com",
        imgSrc: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png",
    }
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

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <div
        className={
          "w-full flex items-center justify-between"
        }
      >
        {/* Logo section */}
        <a href="/" className="flex items-center gap-2 justify-start flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Logo"
            width={55}
            height={55}
            className="rounded-full"
            priority
          />
        </a>

        {/* Main navigation menu */}
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative backdrop-blur-md bg-white/20 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-full shadow-lg flex items-center justify-center px-4 py-2 gap-2"
        >
          {NAV_LINKS.map(link => {
            if (link.label === "Work") {
              return (
                <div
                  key={link.label}
                  onMouseEnter={() => setActive("Work")}
                  className="relative"
                >
                  <a
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 relative block",
                      isActive(link.href!) || active === "Work"
                        ? "text-black dark:text-white"
                        : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                    )}
                  >
                    {(isActive(link.href!) || active === "Work") && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-full z-[-1]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                  {active === "Work" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 w-[clamp(800px,80vw,1000px)] bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8"
                    >
                      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                        {PROJECTS.map((project) => (
                          <ProjectItem key={project.title} {...project} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            }
            if (link.label === "More") {
              return (
                <div
                  key={link.label}
                  onMouseEnter={() => setActive("More")}
                  className="relative"
                >
                  <button
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-1",
                      active === "More"
                        ? "text-black dark:text-white"
                        : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                    )}
                    aria-haspopup="true"
                    aria-expanded={active === "More"}
                    type="button"
                  >
                    {active === "More" && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-full z-[-1]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">More</span>
                  </button>
                  {active === "More" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 z-50 w-[clamp(600px,70vw,800px)] bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6"
                    >
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-8 grid grid-cols-2 gap-6">
                          {VAULT_PRIMARY_LINKS.map((item) => (
                            <VaultImageCard key={item.title} {...item} />
                          ))}
                        </div>
                        <div className="col-span-4 flex flex-col gap-4">
                          {VAULT_SECONDARY_LINKS.map((item) => (
                            <VaultIconLink key={item.title} {...item} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 relative",
                  isActive(link.href!)
                    ? "text-black dark:text-white"
                    : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                )}
              >
                {isActive(link.href!) && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
           <a
              href="#schedule"
              className="ml-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 bg-white text-black hover:bg-neutral-200"
            >
              Book a Call
            </a>
        </nav>

        {/* Command Menu Icon */}
        <div className="flex items-center justify-end flex-shrink-0">
             <button className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black dark:text-white"
                    >
                    <path
                        d="M6 8.25C6 7.00736 7.00736 6 8.25 6H15.75C16.9926 6 18 7.00736 18 8.25V15.75C18 16.9926 16.9926 18 15.75 18H8.25C7.00736 18 6 16.9926 6 15.75V8.25Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M8.25 4.5V6M15.75 4.5V6M4.5 8.25H6M4.5 15.75H6M8.25 18V19.5M15.75 18V19.5M18 8.25H19.5M18 15.75H19.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
