import { Playfair, Montserrat } from 'next/font/google'

export const playfair = Playfair({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
})
