import MovieDetails from "../../components/movieDetails";
import classes from "../../components/movieId.module.css";
import { useRouter } from "next/router";

function MovieDetail(props) {
  const router = useRouter();

  return (
    <>
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
  console.log(movieId);

  console.log(123);
  const response = await fetch(
    `https://imdb-api.com/en/API/Title/k_629ie9ew/${movieId}`
  );

  const data = await response.json();

  console.log(data);

  return {
    props: {
      movie: {
        id: data.id,
        title: data.title,
        year: data.year,
        image: data.image,
        genre: data.genres,
        runtime: data.runtimeStr,
        actors: data.stars,
        description: data.plot,
        imdbRating: data.imDbRating,
        imdbVotes: data.imDbRatingVotes,
      },
    },
  };
}

export default MovieDetail;
