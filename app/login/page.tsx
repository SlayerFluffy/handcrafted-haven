import { headers } from "next/headers"
import { redirect } from "next/navigation"
import LoginForm from "@/app/login/login-form"
import { auth } from "@/app/lib/auth"

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="bg-background px-6 py-12">
      <div className="mx-auto flex max-w-5xl justify-center">
        <LoginForm />
      </div>
    </main>
  )
}

export default Page
