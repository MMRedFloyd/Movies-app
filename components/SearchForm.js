import { useContext } from "react";
// import { Link } from "react-router-dom";

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
        {/* <Link to="/details"> */}
        <button type="submit" className={classes.searchBtn}>
          Go
        </button>
        {/* </Link> */}
      </form>
    </>
  );
}

export default SearchForm;
