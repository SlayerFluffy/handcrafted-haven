import Link from 'next/link'

const Hero = () => {

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background via-background to-[#f0e0cc] px-6 py-24 text-center md:px-10 md:py-32">
      <div className="relative mx-auto max-w-3xl">

        <h1 className="font-serif mt-4 text-4xl font-bold leading-tight text-text md:text-5xl lg:text-6xl">
          Discover Treasures Made by Human Hands
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-light">
          Handcrafted Haven connects you with independent artisans who pour their skill and heart into every piece they create.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">

          <Link href="/products" className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-surface transition-colors hover:bg-secondary">
            Browse Products
          </Link>

          <Link href="/users" className="rounded-md border border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-surface">
            Meet Our Creators
          </Link>

        </div>

      </div>
    </section>
  )
}

export default Hero