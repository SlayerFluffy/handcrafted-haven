
type Props = {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
  
  const { id } = await params

  return (
    <main className="px-6 py-8">
      <p>Seller Profile Page</p>
      <p>Id: {id}</p>
    </main>
  )
}

export default Page
