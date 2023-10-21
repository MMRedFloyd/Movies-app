import { useContext, useRef } from "react";
import classes from "./SearchForm.module.css";
import SearchContext from "../context/search-context";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

function SearchForm() {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  function submitSearch(e) {
    e.preventDefault();
    const title = searchRef.current.value;
    dispatch({ type: "SET_SEARCH_TITLE", payload: title });
    router.push({
      pathname: "/results",
      query: { searchTitle: title },
    });
    searchRef.current.value = "";
  }

  return (
    <>
      <form className={classes.inputForm} onSubmit={submitSearch}>
        <input
          className={classes.inputText}
          type="text"
          placeholder="Search"
          ref={searchRef}
        />
        <button type="submit" className={classes.searchBtn}>
          Go
        </button>
      </form>
    </>
  );
}

export default SearchForm;
