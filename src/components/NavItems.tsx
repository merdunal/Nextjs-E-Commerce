"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NavItems = () => {
  const [ActiveIndex, setActiveIndex] = useState<null | number>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyOpen = ActiveIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));
  useOnClickOutside(navRef, () => setIsDropdownOpen(false));

  return (
    <div className="relative flex gap-4 h-full" ref={navRef}>
      <NavItem
        category={{ label: "Kategoriler", href: "#" }}
        handleOpen={() => setIsDropdownOpen(!isDropdownOpen)}
        isOpen={isDropdownOpen}
        isAnyOpen={isAnyOpen}
      />
      {isDropdownOpen && (
        <div className="absolute left-0 top-full w-80 rounded-lg bg-white border border-gray-300 shadow-lg z-10">
          <div className="relative p-2">
            <div className="grid grid-cols-2 gap-3">
              {PRODUCT_CATEGORIES.map((category) => (
                <Link
                  key={category.label}
                  href={category.href}
                  className="flex items-center px-2 py-1 text-gray-900 hover:underline transition-colors duration-200"
                >
                  <span className="flex-1">{category.label}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-300 ml-2"
                    )}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItems;