import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/app/lib/auth"
import SignupForm from "@/app/signup/signup-form"

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
        <SignupForm />
      </div>
    </main>
  )
}

export default Page
