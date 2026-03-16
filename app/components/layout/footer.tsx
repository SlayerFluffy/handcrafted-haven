const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="px-10 py-12">
      <p className="text-center text-sm text-text">
        &copy; {year} Handcrafted Haven. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
