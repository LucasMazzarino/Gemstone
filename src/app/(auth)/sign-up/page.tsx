"use client"

import { Icons } from "@/components/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthCredentialsValidator, TAuthCredentialValidator } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { toast } from "sonner"
import { ZodError } from "zod"
import { useRouter } from "next/navigation"

const Page = () => {

  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm<TAuthCredentialValidator>({
    resolver: zodResolver(AuthCredentialsValidator)
  })


const router = useRouter()

const {mutate, isLoading} = 
  trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if(err.data?.code === "CONFLICT") {
        toast.error("This email is already in use.")
        return
      }
    
      if(err instanceof ZodError) {
        toast.error(err.issues[0].message)
        return
      }
      toast.error('Something went wrong')
    },
    onSuccess: ({sentoToEmail}) => {
      toast.success(`verification email sent to ${sentoToEmail}.`)
      router.push('/')
    }
    
})

  const onSubmit = ({
    email, 
    password,
  }: TAuthCredentialValidator) => {
    mutate({ email, password})
  }

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />
            <h1 className="text-2xl font-bold">
              Crear mi Cuenta
            </h1>
            <Link className={buttonVariants({
              variant: 'link',
              className: 'gap-1.5'
            })}
              href='/sign-in'>
              Ya tienes una cuenta? Inicia sección aquí
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor='email'>Correo</Label>
                  <Input 
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                      placeholder="Tucorreo@ejemplo.com"
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor='email'>Contraseña</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                      placeholder="Contraseña"
                    />
                    {errors?.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>
                <Button>Registrarme</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page