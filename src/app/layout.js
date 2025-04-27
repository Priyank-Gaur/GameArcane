import './globals.css'

export const metadata = {
  title: 'GameArcane',
  description: 'Explore and collect awesome games!',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
