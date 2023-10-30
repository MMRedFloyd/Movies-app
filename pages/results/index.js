import Head from "next/head";

import SearchForm from "../../components/SearchForm";
import Results from "../../components/Results";
import Loader from "@/components/UI/LoaderMirza";

function ResultsPage() {
  return (
    <>
      <Head>
        <title>Movies App</title>
        <meta
          name="description"
          content="Find a movie to watch with your friends and family!"
        />
      </Head>
      <SearchForm />
      <Results />
    </>
  );
}

export default ResultsPage;
