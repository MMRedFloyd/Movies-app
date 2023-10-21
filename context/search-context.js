import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

const SearchContext = React.createContext({
  searchTitle: "",
  searchRef: "",
  onSubmitSearch: () => {},
});

export function SearchContextProvider(props) {
  const searchRef = useRef();
  const [searchTitle, setSearchTitle] = useState("");
  const router = useRouter();

  function submitSearch(e) {
    e.preventDefault();
    const title = searchRef.current.value;
    setSearchTitle(title);
    router.push({
      pathname: "/results",
      query: { searchTitle: title },
    });
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
