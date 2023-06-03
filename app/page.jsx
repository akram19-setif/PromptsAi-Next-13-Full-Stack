import Feed from "@/components/Feed";
const Home = () => {
  return (
    <section className='w-full   flex-center flex-col'>
      {/* title */}
      <h1 className='text-center head_text'>
        Let's Go Ai
        <br className='md:max-md:hidden' />
        <span className='orange_gradient text-center'>Ai-Powered Prompts</span>
      </h1>
      <p className='desc   text-center'>
        PromptsAi is an open-source AI prompting tool for modern world to
        discover, Create and share creative prompts.
      </p>

      {/* feed */}
      <Feed />
    </section>
  );
};

export default Home;
