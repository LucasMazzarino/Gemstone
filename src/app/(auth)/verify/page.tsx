import VerifyEmail from '../../../components/VerfyEmail'
import Image from 'next/image'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token
  const toEmail = searchParams.to

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        {token && typeof token === 'string' ? (
          <div className='grid gap-6'>
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image
                src='/gemstone-email.png'
                fill
                alt='gemstone email'
              />
            </div>

            <h3 className='font-semibold text-2xl'>
              Confirma tu correo electrónico
            </h3>

            {toEmail ? (
              <p className='text-muted-foreground text-center'>
                Hemos enviado un enlace de verificación a{' '}
                <span className='font-semibold'>
                  {toEmail}
                </span>
                .
              </p>
            ) : (
              <p className='text-muted-foreground text-center'>
                Hemos enviado un enlace de verificación a su
                correo electrónico.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailPage