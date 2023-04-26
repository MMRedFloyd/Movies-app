import React, { useRef, useState } from "react";

const SearchContext = React.createContext({
  searchTitle: "",
  searchRef: "",
  onSubmitSearch: () => {},
});

export function SearchContextProvider(props) {
  const searchRef = useRef();
  const [searchTitle, setSearchTitle] = useState("");

  function submitSearch(e) {
    e.preventDefault();
    setSearchTitle(searchRef.current.value);
    searchRef.current.value = "";
  }

  return (
    <SearchContext.Provider
      value={{
        searchTitle: searchTitle,
        onSubmitSearch: submitSearch,
        searchRef: searchRef,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
