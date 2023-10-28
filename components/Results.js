import { useEffect, useContext, useState } from "react";
import ResultItem from "./ResultItem";
import classes from "./Results.module.css";
import Link from "next/link";
import Image from "next/image";
import MovieImage from "../public/watching-a-movie.png";
import { useDispatch, useSelector } from "react-redux";
import { savedActions } from "@/store/saved-sliceMirza";
import Loader from "./UI/Loader";
import { searchActions } from "@/store/search-sliceMirza";
import { startActions } from "@/store/start-sliceMirza";
import { authActions } from "@/store/auth-sliceMirza";

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
      console.log(loading);
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
      console.log(loading);

      setMovies(transformedMovies);
      dispatch(authActions.setLoading(false));
      console.log(loading);

      dispatch(
        startActions.manageStartSite({
          resultsPage: true,
        })
      );
      dispatch(savedActions.hide());
    }
    console.log(loading);
    if (searchTitle) {
      fetchMovies();
    }
    dispatch(searchActions.setSearchTitle(""));
  }, [searchTitle]);

  return (
    <>
      <div className={classes.containerMini}>
        {loading && <Loader />}
        {message && !bookmarkShow && !likeShow && (
          <div className={classes.box}>
            <Image
              src={MovieImage}
              className={classes.movieimage}
              alt="Movie image"
            />
            <h1 className={classes.movietext}>
              Search for some movie and enjoy!
            </h1>
          </div>
        )}

        {startPage &&
          !bookmarkShow &&
          !likeShow &&
          movies.map((movie) => (
            <Link
              className={classes.link}
              href={`/results/${movie.id}`}
              key={movie.id}
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
          !loading &&
          bookmarks.map((movie) => (
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
    </>
  );
}

export default Results;
