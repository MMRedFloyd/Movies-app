import { useContext } from "react";
import classes from "./SearchForm.module.css";
import SearchContext from "../context/search-context";

function SearchForm() {
  const searchCtx = useContext(SearchContext);

  return (
    <>
      <form className={classes.inputForm} onSubmit={searchCtx.onSubmitSearch}>
        <input
          className={classes.inputText}
          type="text"
          placeholder="Search"
          ref={searchCtx.searchRef}
        />
        <button type="submit" className={classes.searchBtn}>
          Go
        </button>
      </form>
    </>
  );
}

export default SearchForm;
