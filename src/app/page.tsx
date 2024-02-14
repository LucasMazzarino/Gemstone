import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductsReel from "@/components/ProductsReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name:"Envíos a todo el País",
    Icon: ArrowDownToLine,
    description : "Envíos a todo Uruguay"
  },
  {
    name:"Calidad garantizad",
    Icon: CheckCircle,
    description : "Todos los productos fabricados con la mejor calidad"
  },
  {
    name:"Puedes convertirte en Revendedor",
    Icon: Leaf,
    description : "Si te interesa la venta de joyas contáctenos para obtened mas información "
  },

]

export default function Home() {
  return (<>
  <MaxWidthWrapper>
    <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Tu tienda Online  {' '}
         <span className="text-violet-700">
          de Joyas
         </span>
         .
      </h1>
      <p className="mt-6 text-lg max-w-prose text-muted-foreground">
        Tienda online de Joyas de la mejor calidad en Uruguay.
        Te intersa ser revendedor? Contactanos aqui --aca va el link--
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link href='/products' className={buttonVariants()}>Navegar</Link>
        <Button variant='ghost'>tus productos deseados &rarr;</Button>
      </div>
    </div>
    
    <ProductsReel query={{sort: "desc", limit: 4}} title="Nuevos Productos" href="/products" />
  </MaxWidthWrapper>
  <section className="border-t border-gray-200 bg-gray-50">
      <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 
          sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg-gap-y-0">
            {perks.map((perk) =>(
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
