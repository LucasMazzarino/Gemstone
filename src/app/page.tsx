import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductsReel from "@/components/ProductsReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { getServerSideUser } from "@/lib/payload-utils";
import { ICONS_HOME } from "../config/index"
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";


const Home = async () => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (<>
    <div className="relative py-40 mx-auto text-center flex flex-col items-center lg:py-10 max-w-full rounded-lg bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-slate-100 opacity-50 z-10 rounded-lg"></div>
      <Image 
        src="/baner.png" 
        alt="Background" 
        quality={100}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="relative z-20 w-[500px] max-md:w-[300px]">
        <Image src="/bge.png" alt="font" width={500} height={500} priority/>
      </div>
      <h2 className="relative z-20 text-4xl font-sans font-bold tracking-tight text-gray-900 sm:text-6xl h-20" style={{ textShadow: '0 0 20px white' }}>
        Tu tienda Online {' '}
        <span className="text-violet-700">de Joyas</span>
        .
      </h2>
      <div className="relative z-20 flex flex-col sm:flex-row sm:pt-5 gap-6 mt-10">
        <Link href="/product" className={buttonVariants()}>Navegar</Link>
      </div>
    </div>
  <MaxWidthWrapper>
    <ProductsReel query={{sort: "desc", limit: 5}} user={user} title="Nuevos Productos" href="/product" />
  </MaxWidthWrapper>
  <section className="border-t border-gray-200 bg-gray-50">
      <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 
          sm:gap-x-6 lg:grid-cols-3 lg:gap-x-1 lg-gap-y-0 justify-start items-start">
            {ICONS_HOME.map((perk) =>(
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-900">
                    {<perk.Icon className="w-1/3 h-1/3"/>}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </MaxWidthWrapper>
  </section>
  </>
)}

export default Home
