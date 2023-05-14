import { Nav } from "@components";
import "@styles/globals.css"

export const metadata = {
  title: "Promptab",
  description: "Discover and Share AI Prompts",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;