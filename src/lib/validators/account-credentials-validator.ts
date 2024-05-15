import { z } from "zod"

export const SignUpAuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 
    'Password must be al least 8 characters long'}),
    phoneNumber: z.string().regex(/^\d{9}$/, {
      message:"El numero debe tener 9 digitos"
    }), 
    firstName: z.string(),
    lastName: z.string(),
    department: z.enum([  
    "Artigas",
    "Canelones",
    "Cerro Largo",
    "Colonia",
    "Durazno",
    "Flores",
    "Florida",
    "Lavalleja",
    "Maldonado",
    "Montevideo",
    "Paysandú",
    "Río Negro",
    "Rivera",
    "Rocha",
    "Salto",
    "San José",
    "Soriano",
    "Tacuarembó",
    "Treinta y Tres"]),
    address: z.string().max(40), 
})

export const SignInAuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 
    'Password must be al least 8 characters long'}),
})


export type TSignInAuthCredentialsValidator = z.infer<typeof SignInAuthCredentialsValidator>

export type TSignUpAuthCredentialsValidator = z.infer<typeof SignUpAuthCredentialsValidator>