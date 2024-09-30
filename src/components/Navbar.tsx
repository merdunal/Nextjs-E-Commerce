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
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="ml-4 flex lg:ml-0">
                  <Link href={"/"}>
                    <Icons.logo className="h-10 w-10" />
                  </Link>
                </div>
                <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                  <NavItems />
                </div>
              </div>

              <div
                className={`${
                  user ? "flex-grow mx-20" : "flex-grow mx-8"
                } lg:flex-grow`}
              >
                <Search />
              </div>

              <div className="ml-auto flex items-center space-x-4">
  {user ? (
    <UserAccountNav user={user} />
  ) : (
    <>
      <Link
        href="/sign-in"
        className={buttonVariants({ variant: "ghost" })}
      >
        {/* Change text based on screen size */}
        <span className="block md:hidden">Giriş/Kayıt</span> {/* Mobile Text */}
        <span className="hidden md:block">Giriş Yap</span> {/* Desktop Text */}
      </Link>
      <span
        className="h-6 w-px bg-gray-200"
        aria-hidden="true"
      />
      {/* Hide the "Hesap oluştur" button on medium devices */}
      <Link
        href="/sign-up"
        className={`${buttonVariants({ variant: "ghost" })} hidden md:block`}
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
