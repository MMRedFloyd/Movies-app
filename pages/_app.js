import Rootlayout from "../components/Root";
import "../styles/globals.css";
import { FormContextProvider } from "../context/form-context";
import { SearchContextProvider } from "../context/search-context";

export default function App({ Component, pageProps }) {
  return (
    <Rootlayout>
      <FormContextProvider>
        <SearchContextProvider>
          <Component {...pageProps} />
        </SearchContextProvider>
      </FormContextProvider>
    </Rootlayout>
  );
}
