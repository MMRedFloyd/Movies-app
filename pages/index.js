import Head from "next/head";

import MainContent from "../components/MainContent";
import LoginForm from "../components/LoginForm";

function HomePage() {
  return (
    <>
      <Head>
        <title>Movies App</title>
        <meta
          name="description"
          content="Find a movie to watch with your friends and family!"
        />
      </Head>
      <MainContent />
      <LoginForm />
    </>
  );
}

export default HomePage;
