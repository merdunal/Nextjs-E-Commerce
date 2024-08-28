"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ category, handleOpen, isAnyOpen, isOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5 transition-all duration-300 hover:bg-gray-100 hover:scale-105"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-300", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>
      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full rounded-lg bg-white border border-gray-200 shadow-lg z-50",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div className="relative p-10 bg-white">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {category.featured.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between font-medium text-gray-900 hover:underline"
                >
                  <span>{item.name}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-300 ml-0"
                    )}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
