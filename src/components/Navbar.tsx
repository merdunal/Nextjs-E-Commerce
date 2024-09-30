import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";
import Search from "./Search";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="sticky bg-white z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between h-16 px-4"> {/* Flex container for mobile */}
            <div className="flex items-center"> {/* Left section with logo */}
              <Link href={"/"}>
                <Icons.logo className="h-8 w-8" /> {/* Logo size adjusted for mobile */}
              </Link>
            </div>

            <div className="flex items-center space-x-4"> {/* Space between nav items */}
              <div className="flex-grow text-center"> {/* Centered area for other components */}
                <Search />
              </div>

              <div className="flex items-center space-x-4"> {/* Increased space between items */}
                {user ? (
                  <UserAccountNav user={user} />
                ) : (
                  <Link
                    href="/sign-in"
                    className={`${buttonVariants({ variant: "ghost" })} border border-gray-300 rounded-md px-2 text-xs`}
                  >
                    <span className="block md:hidden text-xs">Giriş</span>
                    <span className="hidden md:block text-xs">Giriş Yap</span>
                  </Link>
                )}
                <div className="flex items-center"> {/* Wrapping cart in a div */}
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;

