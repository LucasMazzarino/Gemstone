import { 
  SignInAuthCredentialsValidator,
  SignUpAuthCredentialsValidator,  
} from "../lib/validators/account-credentials-validator";
import { publicProcedure, router} from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from 'zod'

export const authRouter = router({
  createPayloadUser: publicProcedure
  .input(SignUpAuthCredentialsValidator)
  .mutation( async ({input}) => {
    const {email, password, firstName, lastName, address, phoneNumber, department} = input
    
    const payload = await getPayloadClient()

    const{docs: users} = await payload.find({
      collection:"users",
      where: {
        email: {
          equals: email,
        }
      }
    })

    if(users.length !== 0)
      throw new TRPCError({ code:'CONFLICT' })

    await payload.create({
      collection: "users",
      data: {
        firstName,
        lastName,
        phoneNumber,
        address,
        department,
        email,
        password,
        role:'user',
      },
    })
    return {success:true, sentoToEmail:email}
  }),

  signIn: publicProcedure
  .input(SignInAuthCredentialsValidator)
  .mutation( async ({input, ctx})=> {
    const {email, password} = input
    const { res } = ctx
    
    const payload = await getPayloadClient()

    try {
      await payload.login({
        collection: "users",
        data: {
          email,
          password,
        },
        res,
      })
      return {succes:true}
    } catch (err) {
      throw new TRPCError({ code:'UNAUTHORIZED' })
    }
  }),

  verifyEmail: publicProcedure
  .input(z.object({ token: z.string() }))
  .query(async ({ input }) => {
    const { token } = input

    const payload = await getPayloadClient()

    const isVerified = await payload.verifyEmail({
      collection: 'users',
      token,
    })

    if (!isVerified)
      throw new TRPCError({ code: 'UNAUTHORIZED' })

    return { success: true }
  }),
})