import Link from 'next/link'

const CreatorInvite = () => (
  <section className="bg-primary px-6 py-20 text-center md:px-10">
    <div className="mx-auto max-w-2xl">
      <h2 className="font-serif mb-4 text-3xl font-bold text-surface md:text-4xl">Are You a Maker?</h2>
      <p className="mb-8 text-base leading-relaxed text-surface/80">Join our growing community of artisans. Share your craft, build your audience, and sell to people who truly value what you make.</p>
      <Link href="/signup" className="inline-block rounded-md bg-surface px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-background">Start Selling Today</Link>
    </div>
  </section>
)

export default CreatorInvite
