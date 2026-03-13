
const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 px-10 py-8">
      <p className="text-sm text-gray-400 text-center">
        &copy; {year} Handcrafted Haven. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer