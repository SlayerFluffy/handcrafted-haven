const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="px-10 py-12">
      <p className="text-sm text-brand-text text-center">
        &copy; {year} Handcrafted Haven. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
