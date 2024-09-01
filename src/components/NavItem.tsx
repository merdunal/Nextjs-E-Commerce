"use client";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  category: {
    label: string;
    href: string;
  };
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ category, handleOpen, isAnyOpen, isOpen }: NavItemProps) => {
  return (
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
  );
};

export default NavItem;
