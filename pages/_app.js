import Rootlayout from "../components/Root";
import "../styles/globals.css";
import { FormContextProvider } from "../context/form-context";
import { SearchContextProvider } from "../context/search-context";
import { AuthContextProvider } from "../context/auth-context";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <FormContextProvider>
        <SearchContextProvider>
          <Rootlayout>
            <Component {...pageProps} />
          </Rootlayout>
        </SearchContextProvider>
      </FormContextProvider>
    </AuthContextProvider>
  );
}
