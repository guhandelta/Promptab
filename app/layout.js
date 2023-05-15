import { Nav, Provider } from "@components";
import "@styles/globals.css"

export const metadata = {
  title: "Promptab",
  description: "Discover and Share AI Prompts",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/*Browser session is passed as the prop to SessionProvider component, and is now made available to 
           all the pages by wrapping the children of the layout component, as this is the HoC for all the 
          components/pages just as _app.js was in the previous versions of NextJS  */}
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;