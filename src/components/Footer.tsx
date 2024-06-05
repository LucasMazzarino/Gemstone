'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { LogoFb, LogoIg, LogoWpp } from './Icons'
import Image from 'next/image'

const Footer = () => {
  const pathname = usePathname()
  const pathsToMinimize = [
    '/verify-email',
    '/sign-up',
    '/sign-in',
  ]

  return (
    <footer className='bg-white flex-grow-0'>
      <MaxWidthWrapper>
        <div className='border-t border-gray-200'>
          {pathsToMinimize.includes(pathname) ? null : (
            <div className='pb-8 pt-8'>
              <div className='flex justify-center mt-8'>
              <Link href='/'>
                  <Image src="https://cdn.gemstonuruguay.com/thumnail.png" alt="thumnail" width={200} height={200}/>
                </Link>
              </div>
            </div>
          )}
          {pathsToMinimize.includes(pathname) ? null : (
            <div>
              <div className='relative flex items-center px-6 py-6 sm:py-8 lg:mt-0'>
                <div className='absolute inset-0 overflow-hidden rounded-lg'>
                  <div
                    aria-hidden='true'
                    className='absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90'
                  />
                </div>

                <div className='text-center relative mx-auto max-w-sm'>
                  <h3 className='font-semibold text-gray-900'>
                    Vuélvete revendedor!
                  </h3>
                  <p className='mt-2 text-sm text-muted-foreground'>
                   Si te interesa volverte revendedor podrás acceder a increíbles precios mayorista
                   para iniciar tu propio negocio! ponte en contacto para obtener mas información{' '}
                   <a href="https://api.whatsapp.com/send?phone=59892349023&text=Hola%2C%20vi%20esto%20en%20%20la%20web%20Gemstone.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" className='font-medium text-black hover:text-zinc-900'>
                     Aquí!
                   </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='py-10 md:flex md:items-center md:justify-between'>
          <div className='text-center md:text-left'>
            <p className='text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} Todos los Derechos
              Reservados
            </p>
          </div>

          <div className='mt-4 flex items-center justify-center md:mt-0'>
            <div className='flex space-x-5 items-center jsu'>
              <LogoFb/>
              <LogoIg/>
              <LogoWpp/>
              <Link
                href='/Terminos-y-condiciones.pdf'
                target="_blank"
                rel="noopener noreferrer"
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Términos y Condiciones de uso
              </Link>
            </div>
          </div>
          </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer