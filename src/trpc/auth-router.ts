import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router} from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createPayloadUser: publicProcedure
  .input(AuthCredentialsValidator)
  .mutation( async ({input}) => {
    const {email, password} = input
    const payload = await getPayloadClient()

    //chek if user alredy exist

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
        email,
        password,
        role:'user',
      },
    })

    return {succes:true, sentoToEmail:email}
  }),

  signIn: publicProcedure
  .input(AuthCredentialsValidator)
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
})