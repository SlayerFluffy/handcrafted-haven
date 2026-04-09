
const steps = [
  {
    number: '01',
    title: 'Browse the Collection',
    description: 'Explore thousands of handmade goods across every category — from jewelry and ceramics to textiles and woodwork.',
  },
  {
    number: '02',
    title: 'Meet the Maker',
    description: 'Every product links back to a creator profile. Learn their story, their process, and what drives their craft.',
  },
  {
    number: '03',
    title: 'Shop with Confidence',
    description: 'Secure checkout, transparent pricing, and a community built on trust between buyers and makers.',
  },
]

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => {

  return (
    <div key={number} className="flex flex-col items-center text-center md:items-start md:text-left">
      <span className="font-serif mb-4 text-4xl font-bold text-accent">{number}</span>
      <h3 className="mb-2 text-base font-semibold text-text">{title}</h3>
      <p className="text-sm leading-relaxed text-text-light">{description}</p>
    </div>
  )
}

const HowItWorks = () => {

  const stepCards = steps.map(({ number, title, description }) => <StepCard
    key={number}
    number={number}
    title={title}
    description={description}
  ></StepCard>)

  return (
    <section className="border-y border-border bg-surface px-6 py-20 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-serif mb-12 text-center text-2xl font-semibold text-text md:text-3xl">How It Works</h2>
        <div className="grid gap-10 md:grid-cols-3">{stepCards}</div>
      </div>
    </section>
  )
}

export default HowItWorks