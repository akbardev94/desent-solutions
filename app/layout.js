import { Fraunces, Outfit } from "next/font/google"
import "./globals.css"

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
})

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Design your workspace · monis.rent",
  description: "Build a Bali desk setup and request a weekly rental from monis.rent.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
