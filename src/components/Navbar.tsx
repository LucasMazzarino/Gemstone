import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Icons } from "./Icons"
import NavItems from "./Navitems"
import { buttonVariants } from "./ui/button"
import Cart from "./Cart"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import UserAccountNav from "./UserAccountNav"

const Navbar = async () => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TODO: Mobil nav */}
              <div className="ml-4 flex lg:ml-0">
                <Link href='/'>
                  <img src="/favicon.ico" alt="icon" width={40} height={40}/>
                </Link>
              </div>
              <div className="hidden z-50 lg:ml lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>Iniciar Sección</Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200"
                      arial-hidden="true" />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (<Link
                    href="/sign-up"
                    className={buttonVariants({
                      variant: "ghost",
                    })}>
                    Regístrate Aquí
                  </Link>
                  )}

                  {user ? (
                    <span
                      className="h-6 w-px bg-gray-200"
                      arial-hidden="true"
                    />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        arial-hidden="true"
                      />
                    </div>
                  )}
                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar