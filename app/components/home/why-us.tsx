
const reasons = [
  {
    title: 'Handcrafted with Love',
    description: 'Every item is made by hand — no mass production, no shortcuts. Each piece carries the care and skill of the maker.',
  },
  {
    title: 'Support Independent Creators',
    description: "Your purchase goes directly to the artisan. You're not shopping at a big box store — you're investing in a person's craft.",
  },
  {
    title: 'Unique, One-of-a-Kind',
    description: "Find pieces you won't see anywhere else. Handmade goods are inherently unique — own something that's truly yours.",
  },
]

const ReasonCard = ({ title, description }: { title: string, description: string }) => {

  return (
    <div key={title} className="rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
      <h3 className="font-serif mb-3 text-lg font-semibold text-text">{title}</h3>
      <p className="text-sm leading-relaxed text-text-light">{description}</p>
    </div>
  )
}

const WhyUs = () => {

  const reasonCards = reasons.map(({ title, description }) => <ReasonCard
    key={title}
    title={title}
    description={description}
  ></ReasonCard>)

  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif mb-12 text-center text-2xl font-semibold text-text md:text-3xl">Why Shop Handcrafted?</h2>
        <div className="grid gap-8 md:grid-cols-3">{reasonCards}</div>
      </div>
    </section>
  )
}

export default WhyUs