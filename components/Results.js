import { useEffect, useContext, useState } from "react";
import ResultItem from "./ResultItem";
import classes from "./Results.module.css";
import SearchContext from "../context/search-context";
import Link from "next/link";

function Results(props) {
  const [movies, setMovies] = useState([]);
  const searchCtx = useContext(SearchContext);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://imdb-api.com/en/API/AdvancedSearch/k_629ie9ew/?title=${searchCtx.searchTitle}`
      );

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.id,
          title: movieData.title,
          year: movieData.description,
          genre: movieData.genres,
          image: movieData.image,
        };
      });
      setMovies(transformedMovies);
    }
    if (searchCtx.searchTitle) {
      fetchMovies();
    }
  }, [searchCtx.searchTitle]);

  return (
    <>
      <div className={classes.containerMini}>
        <h2>{props.data}</h2>
        {movies.map((movie) => (
          <Link
            className={classes.link}
            href={`/results/${movie.id}`}
            key={movie.id}
          >
            <ResultItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              image={movie.image}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Results;
