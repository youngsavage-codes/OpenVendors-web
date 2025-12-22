"use client";

import {
  Element3,
  Calendar,
  BookSaved,
  People,
  Setting2,
  ArrowLeft2,
  Profile2User,
  Tag,
} from "iconsax-reactjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

/* ---------------- NAV CONFIG ---------------- */

const navItems = [
  {
    href: "/portal/dashboard",
    icon: Element3,
    label: "Dashboard",
  },
  {
    href: "/portal/calendar",
    icon: Calendar,
    label: "Calendar",
  },
  {
    icon: Tag,
    label: "Sales",
    children: [
      { href: "/portal/sales/daily-summery", label: "Daily Sales Summery" },
      { href: "/portal/sales/appointments", label: "Appointments" },
      { href: "/portal/sales/payments", label: "Payments" },
    ],
  },
  {
    icon: BookSaved,
    label: "Catalog",
    children: [
      { href: "/portal/catalog/services", label: "Services" },
      { href: "/portal/catalog/products", label: "Products" },
    ],
  },
  {
    icon: People,
    label: "Clients",
    children: [{ href: "/portal/clients/list", label: "Client List" }],
  },
  {
    icon: Profile2User,
    label: "Team",
    children: [
      { href: "/portal/team/members", label: "Team Members" },
      { href: "/portal/team/shifts", label: "Scheduled Shifts" },
    ],
  },
  {
    icon: Setting2,
    label: "Settings",
    href: "/portal/settings",
  },
];

/* ---------------- ICON SIDEBAR ---------------- */

const IconSidebar = ({
  onSelect,
}: {
  onSelect: (item: any) => void;
}) => {
  const pathname = usePathname();

  return (
    <aside className="w-20 h-screen border-r-2 border-[#E9EBEC] bg-white flex flex-col items-center py-6 gap-6 z-20">
      {navItems.map((item) => {
        const Icon = item.icon;

        const isActive =
          (item.href && pathname.startsWith(item.href)) ||
          (item.children &&
            item.children.some((child: any) =>
              pathname.startsWith(child.href)
            ));

        return (
          <div key={item.label} className="relative group">
            {/* Icon Button */}
            <button
              onClick={() => onSelect(item)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg transition",
                isActive ? "bg-[#1F363D]" : "hover:bg-gray-100"
              )}
            >
              <Icon
                size={22}
                variant={isActive ? "Bold" : "Outline"}
                color={isActive ? "#fff" : "#69787D"}
              />
            </button>

            {/* Tooltip */}
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
              {item.label}
            </span>
          </div>
        );
      })}
    </aside>
  );
};

/* ---------------- SUB MENU ---------------- */

const SubMenuSidebar = ({
  item,
  onClose,
}: {
  item: any;
  onClose: () => void;
}) => {
  const isOpen = !!item?.children;

  return (
    <aside
      className={cn(
        "absolute top-0 left-20 h-screen w-56 border-r-2 border-[#E9EBEC] bg-white",
        "origin-left transform transition-all duration-300 ease-out",
        isOpen
          ? "scale-x-100 opacity-100"
          : "scale-x-0 opacity-0 pointer-events-none"
      )}
    >
      {item?.children && (
        <div className="px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 relative">
            <h3 className="font-semibold text-lg">{item.label}</h3>

            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#E9EBEC] hover:bg-gray-100 transition absolute -right-8 bg-white"
            >
              <ArrowLeft2 size={18} color="#1F363D" />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2">
            {item.children.map((child: any) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose} // Close submenu on navigate
                className="py-2 px-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                {child.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </aside>
  );
};

/* ---------------- MAIN ---------------- */

const SideNav = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<any>(null);

  const handleSelect = (item: any) => {
    if (item.href) {
      router.push(item.href);
      setActiveItem(null);
      return;
    }

    setActiveItem(item);
  };

  return (
    <div className="relative h-screen">
      <IconSidebar onSelect={handleSelect} />

      <SubMenuSidebar
        item={activeItem}
        onClose={() => setActiveItem(null)}
      />
    </div>
  );
};

export default SideNav;
