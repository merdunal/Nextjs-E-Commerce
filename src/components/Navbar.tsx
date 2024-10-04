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
    <div className="sticky bg-white z-50 top-0 inset-x-0 h-16 mb-1">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-4"> {/* Flex container for both mobile and large devices */}
              <div className="flex items-center">
                <Link href={"/"}>
                  <Icons.logo className="h-10 w-10 md:h-8 md:w-8" /> {/* Logo size adjusted for large devices */}
                </Link>
                <div className="hidden lg:block lg:ml-8"> {/* Nav items visible on large screens */}
                  <NavItems />
                </div>
              </div>

              <div className="flex-grow mx-8 lg:mx-20 text-center"> {/* Search centered on mobile and spaced on larger devices */}
                <Search />
              </div>

              <div className="ml-auto flex items-center space-x-4">
                {user ? (
                  <UserAccountNav user={user} />
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className={`${buttonVariants({ variant: "ghost" })} hidden md:block`} // Hidden on mobile, visible on medium and larger screens
                    >
                      Giriş Yap
                    </Link>
                    <Link
                      href="/sign-in"
                      className={`${buttonVariants({ variant: "ghost" })} block md:hidden border border-gray-300 rounded-md px-2 text-xs`} // Visible on mobile only
                    >
                      Giriş
                    </Link>
                    <span className="h-6 w-px bg-gray-200 hidden md:block" aria-hidden="true" />
                    <Link
                      href="/sign-up"
                      className={`${buttonVariants({ variant: "ghost" })} hidden md:block`} // Hidden on mobile, visible on medium and larger screens
                    >
                      Hesap oluştur
                    </Link>
                  </>
                )}

                <div className="ml-4 flow-root lg:ml-6">
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
