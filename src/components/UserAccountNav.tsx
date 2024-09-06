"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { User } from "@/payload-types";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          Profilim
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-60 end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black ">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {user.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Satıcı Paneli</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/dashboard/account">Hesap bilgilerim</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/collections/orders">Siparişlerim</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
