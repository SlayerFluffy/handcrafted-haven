import "@/app/globals.css"
import type { Metadata } from "next"
import { montserrat } from "@/app/lib/fonts"
import Header from "@/app/components/layout/header"
import Footer from "@/app/components/layout/footer"

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "WDD 430 Team Project"
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} bg-background text-text antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
