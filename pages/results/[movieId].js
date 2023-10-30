import Head from "next/head";

import MovieDetails from "../../components/movieDetails";
import classes from "../../components/movieId.module.css";
import SearchForm from "@/components/SearchFormMirza";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/auth-sliceMirza";
import Loader from "@/components/UI/LoaderMirza";

function MovieDetail(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleFormSubmit = (searchTitle) => {
    dispatch(authActions.loadingFun());
    router.push({
      pathname: "/results",
      query: { searchTitle },
    });
    dispatch(authActions.loadingFun());
  };

  return (
    <>
      <Head>
        <title>
          {props.movie.title} ({props.movie.year})
        </title>
        <meta
          name="description"
          content="Find a movie to watch with your friends or family!"
        />
      </Head>
      <SearchForm onFormSubmit={handleFormSubmit} />
      <div className={classes.newContainer}>
        <MovieDetails
          id={props.movie.id}
          title={props.movie.title}
          year={props.movie.year}
          image={props.movie.image}
          genre={props.movie.genre}
          runtime={props.movie.runtime}
          actors={props.movie.actors}
          description={props.movie.description}
          imdbRating={props.movie.imdbRating}
          imdbVotes={props.movie.imdbVotes}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const movieId = context.query.movieId;

  const response = await fetch(
    `http://www.omdbapi.com/?i=${movieId}&apikey=3551a91`
  );

  const data = await response.json();

  return {
    props: {
      movie: {
        id: data.imdbID,
        title: data.Title,
        year: data.Year,
        image: data.Poster,
        genre: data.Genre,
        runtime: data.Runtime,
        actors: data.Actors,
        description: data.Plot,
        imdbRating: data.imdbRating,
        imdbVotes: data.imdbVotes,
      },
    },
  };
}

export default MovieDetail;
