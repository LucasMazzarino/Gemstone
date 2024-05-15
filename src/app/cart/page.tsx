import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import CartPage from "./page.client";

export default async function CartPageContainer(){
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return <CartPage user={user}/>
}