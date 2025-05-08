// lib/fonts.ts
import { Poppins } from 'next/font/google'
import { Rubik_Iso } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const rubik = Rubik_Iso({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rubik',
  display: 'swap',
});