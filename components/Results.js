import { useEffect, useContext, useState } from "react";
import ResultItem from "./ResultItem";
import classes from "./Results.module.css";
import Link from "next/link";
import Image from "next/image";
import MovieImage from "../public/watching-a-movie.png";
import { useDispatch, useSelector } from "react-redux";
import { insertLoader, savedActions } from "@/store/saved-sliceMirza";
import Loader from "./UI/Loader";
import { searchActions } from "@/store/search-sliceMirza";
import { startActions } from "@/store/start-sliceMirza";
import { authActions } from "@/store/auth-sliceMirza";
import News from "./News";
import MovieDetails from "./movieDetails";

function Results() {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const searchTitle = useSelector((state) => state.search.searchTitle);
  const bookmarkShow = useSelector((state) => state.saved.bookmarkShow);
  const bookmarks = useSelector((state) => state.saved.bookmarks);

  const likeShow = useSelector((state) => state.saved.likeShow);
  const likes = useSelector((state) => state.saved.likes);
  const message = useSelector((state) => state.start.setMessage);
  const startPage = useSelector((state) => state.start.resultsPage);

  const loading = useSelector((state) => state.auth.loading);

  // Ovdje je haman po defaultu message na true!!!
  useEffect(() => {
    dispatch(startActions.manageStartSite({ message: true }));
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      dispatch(authActions.setLoading(true));

      dispatch(
        startActions.manageStartSite({
          message: false,
          resultsPage: false,
        })
      );

      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchTitle}&apikey=3551a91`
      );

      const data = await response.json();

      const transformedMovies = data.Search.map((movieData) => {
        return {
          id: movieData.imdbID,
          title: movieData.Title,
          year: movieData.Year,
          image: movieData.Poster,
        };
      });

      setMovies(transformedMovies);

      dispatch(authActions.setLoading(false));
      dispatch(
        startActions.manageStartSite({
          resultsPage: true,
        })
      );

      dispatch(savedActions.hide());
    }

    if (searchTitle) {
      fetchMovies();
    }

    dispatch(searchActions.setSearchTitle(""));
  }, [searchTitle]);

  function insertLoader() {
    dispatch(authActions.setLoading(true));
  }

  // Novi API, možda bolji, isprobat ga za npr. Trending movies ili slike

  // useEffect(() => {
  //   async function fetchNewMovies() {
  //     const response = await fetch(
  //       "https://api.themoviedb.org/3/search/movie?query=batman&page=1&api_key=4e44d9029b1270a757cddc766a1bcb63"
  //     );
  //     // "https://api.themoviedb.org/3/movie/157336?api_key=4e44d9029b1270a757cddc766a1bcb63"
  //     const data = await response.json();
  //     console.log(data);
  //   }

  //   fetchNewMovies();
  // }, []);

  return (
    <>
      <div className={classes.mainContainer}>
        <Loader>
          {message && !bookmarkShow && !likeShow && !startPage && (
            // <div className={classes.box}>
            //   <Image
            //     src={MovieImage}
            //     className={classes.movieimage}
            //     alt="Movie image"
            //   />
            //   <h1 className={classes.movietext}>
            //     Search for some movie and enjoy!
            //   </h1>
            // </div>
            <News />
          )}
          <div className={classes.containerMini}>
            {startPage &&
              !bookmarkShow &&
              !likeShow &&
              movies.map((movie) => (
                <Link
                  className={classes.link}
                  href={`/results/${movie.id}`}
                  key={movie.id}
                  onClick={insertLoader}
                >
                  {
                    <ResultItem
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      year={movie.year}
                      image={movie.image}
                    />
                  }
                </Link>
              ))}
            {bookmarkShow &&
              bookmarks.map((movie) => (
                <Link
                  className={classes.link}
                  href={`/results/${movie.id}`}
                  key={movie.id}
                  onClick={insertLoader}
                >
                  <ResultItem
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    year={movie.year}
                    image={movie.image}
                  />
                </Link>
              ))}

            {likeShow &&
              likes.map((movie) => (
                <Link
                  className={classes.link}
                  href={`/results/${movie.id}`}
                  key={movie.id}
                  onClick={insertLoader}
                >
                  <ResultItem
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    year={movie.year}
                    image={movie.image}
                  />
                </Link>
              ))}
          </div>
        </Loader>
      </div>
    </>
  );
}

export default Results;
