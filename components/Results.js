import { useEffect, useContext, useState } from "react";
import ResultItem from "./ResultItem";
import classes from "./Results.module.css";
import Link from "next/link";
import Image from "next/image";
import MovieImage from "../public/watching-a-movie.png";
import SavedContext from "@/context/saved-contextMirza";
import AuthContext from "@/context/auth-contextMirza";
import { useSelector } from "react-redux";
import { savedActions } from "@/store/saved-sliceMirza";

function Results(props) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(true);
  const [message, setMessage] = useState(true);

  const searchTitle = useSelector((state) => state.search.searchTitle);

  const savedCtx = useContext(SavedContext);
  const authCtx = useContext(AuthContext);
  const bookmarkShow = useSelector((state) => state.saved.bookmarkShow);
  const bookmarks = useSelector((state) => state.saved.bookmarks);

  const likeShow = useSelector((state) => state.saved.likeShow);
  const likes = useSelector((state) => state.saved.likes);

  const override = {
    display: "block",
    borderColor: "#ad484a",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    async function fetchMovies() {
      setMessage(false);
      setPage(false);
      setLoading(true);
      // setLoadingSkeleton(true);
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
      setLoading(false);
      // setLoadingSkeleton(false);
      setPage(true);
      dispatch(savedActions.hide());
    }

    if (searchTitle) {
      fetchMovies();
    }
  }, [searchTitle]);

  return (
    <>
      <div className={classes.containerMini}>
        {message && bookmarkShow && likeShow && (
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
        {/* {loading && (
          <PropagateLoader
            color="#ad484a"
            loading={loading}
            cssOverride={override}
          />
        )} */}
        {page &&
          bookmarkShow &&
          likeShow &&
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
