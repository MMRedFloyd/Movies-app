import { useRef } from "react";
import classes from "./SearchForm.module.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { searchActions } from "../store/search-slice";

function SearchForm() {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  function submitSearch(e) {
    e.preventDefault();
    const title = searchRef.current.value;
    dispatch(searchActions.setSearchTitle(title));
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
