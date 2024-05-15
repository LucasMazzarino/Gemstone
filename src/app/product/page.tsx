import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import ProductFilterPage from "./page.client";

export default async function ProductPageContainer(){
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return <ProductFilterPage user={user}/>
}