import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductsReel from "@/components/ProductsReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { getServerSideUser } from "@/lib/payload-utils";
import { ICONS_HOME } from "../config/index"
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import FilterProducts from "@/components/FilterProducts";


const Home = async () => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
  <>
    <div className="relative py-36 mx-auto text-center flex flex-col items-center lg:py-4 max-w-full rounded-lg bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-slate-100 opacity-50 z-10 rounded-lg"></div>
      <Image 
        src="https://cdn.gemstonuruguay.com/baner.png" 
        alt="Background" 
        quality={100}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="relative z-20 w-[500px] max-md:w-[300px]">
        <Image src="https://cdn.gemstonuruguay.com/bge.png" alt="font" width={500} height={500} priority/>
      </div>
      <h2 className="relative z-20 text-4xl font-sans font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl h-20" style={{ textShadow: '0 0 20px white' }}>
        Tu Tienda {' '}
        <span className="text-violet-700">de Joyas </span>
        en Uruguay
      </h2>
      <div className="relative z-20 flex flex-col sm:flex-row sm:pt-5 lg:mt-3 gap-6 mt-8 mb-4">
        <Link href="/product" className={buttonVariants()}>Ver Productos</Link>
      </div>
    </div>
  <MaxWidthWrapper>
      <ProductsReel query={{sort: "desc", limit: 5}} user={user} title="Nuevos Productos" href="/product" />
    </MaxWidthWrapper>
    <section className="border-t w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">   
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Beneficios clave</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Descubre lo que puedes obtener al usar nuestra plataforma.
          </p>
        </div>
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
                <div className="flex flex-col items-center justify-center space-y-4 mt-3">
                  <h3 className="text-xl font-bold">
                    {perk.name}
                  </h3>
                  <p className="mt-3 max-w-[300px] text-muted-foreground">
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
