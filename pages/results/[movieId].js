import Head from "next/head";

import MovieDetails from "../../components/movieDetails";
import classes from "../../components/movieId.module.css";
import { useRouter } from "next/router";

function MovieDetail(props) {
  const router = useRouter();

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
  console.log(123);
  const movieId = context.query.movieId;
  console.log(movieId);

  const response = await fetch(
    `http://www.omdbapi.com/?i=${movieId}&apikey=3551a91`
  );

  const data = await response.json();

  console.log(data);

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
