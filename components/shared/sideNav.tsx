"use client";

import {
  Card,
  Element3,
  ArrowRight2,
  ArrowLeft2,
  Setting2,
  Profile2User,
  Calendar,
  People,
  Bill,
  BookSaved,
  Tag,
} from "iconsax-reactjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  {
    href: "/portal",
    icon: Element3,
    label: "Dashboard",
  },
  {
    href: "/artist/dashboard/grid",
    icon: Calendar,
    label: "Calender",
  },
  {
    href: "/artist/dashboard/grid",
    icon: BookSaved,
    label: "Catalog",
  },
  {
    href: "/artist/dashboard/grid",
    icon: People,
    label: "Client",
  },
  {
    href: "/artist/dashboard/design",
    icon: Tag,
    label: "Sales",
  },
  {
    href: "/artist/dashboard/billing",
    icon: Profile2User,
    label: "Team",
  },
  {
    href: "/artist/dashboard/billing",
    icon: Setting2,
    label: "Settings",
  },
  {
    href: "/artist/dashboard/billing",
    icon: Card,
    label: "Payments",
  },
];

const SideNav = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={cn(
        "relative h-screen bg-white border-r-2 border-[#E9EBEC] flex flex-col py-6 transition-all duration-300",
        expanded ? "w-55 px-4" : "w-20 px-2"
      )}
    >
      {/* Toggle Button (Right Edge) */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "absolute top-6 -right-4 z-50",
          "w-8 h-8 rounded-full border-2 border-[#E9EBEC] bg-white shadow-sm",
          "flex items-center justify-center",
          "hover:bg-gray-100 transition"
        )}
      > 
        {expanded ? <ArrowLeft2 size={16} /> : <ArrowRight2 size={16} />}
      </button>

      {/* Navigation */}
      <nav className="mt-12 flex flex-col gap-5 items-center">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-lg transition-all",
                expanded
                  ? "flex items-center gap-3 px-3 py-2 w-full"
                  : "flex items-center justify-center w-10 h-10",
                isActive
                  ? "bg-[#1F363D]"
                  : "hover:bg-gray-100"
              )}
            >
              <Icon
                size={23}
                variant={isActive ? "Bold" : "Outline"}
                color={isActive ? "#FFFFFF" : "#69787D"}
              />

              {expanded && (
                <span
                  className={cn(
                    "text-[18px] font-medium",
                    isActive ? "text-white" : "text-[#69787D]"
                  )}
                >
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNav;
