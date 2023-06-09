import { Feed } from "@components"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Disover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptab is na opensource AI prompting tool for curious minds to discover and share creative prompts
      </p>

      <Feed />
    </section>
  )
}

export default Home