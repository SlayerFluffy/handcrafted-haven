import type { ReactNode } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/app/lib/auth"

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  return (
    <>
    {children}
    </>
  )
}

export default ProtectedLayout