import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import ProfilePage from "./page.client";


export default async function ProfilePageContainer(){
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return <ProfilePage user={user}/>
}