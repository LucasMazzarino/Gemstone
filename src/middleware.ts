import { NextRequest, NextResponse } from 'next/server'
import { getServerSideUser } from './lib/payload-utils'

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req
  const { user } = await getServerSideUser(cookies)

  if (
    user &&
    ['/sign-in', '/sign-up'].includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/`
    )
  }
  if (
    !user &&
    ['/cart'].includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/`
    )
  }
  if (
    !user &&
    ['/profile'].includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/`
    )
  }

  return NextResponse.next()
}