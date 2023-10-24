import Rootlayout from "../components/Root";
import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FormContextProvider } from "../context/form-context";
import { SearchContextProvider } from "../context/search-context";
import { AuthContextProvider } from "../context/auth-context";
import { SavedContextProvider } from "@/context/saved-contextMirza";
import { Provider } from "react-redux";
import store from "../store/index";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        {/* <FormContextProvider> */}
        {/* <SearchContextProvider> */}
        {/* <SavedContextProvider> */}
        <Rootlayout>
          <Component {...pageProps} />
        </Rootlayout>
        {/* </SavedContextProvider> */}
        {/* </SearchContextProvider> */}
        {/* </FormContextProvider> */}
      </AuthContextProvider>
    </Provider>
  );
}
