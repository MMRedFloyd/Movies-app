import Rootlayout from "../components/Root";
import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider, useDispatch } from "react-redux";
import store from "../store/index";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <AuthContextProvider> */}
      {/* <FormContextProvider> */}
      {/* <SearchContextProvider> */}
      {/* <SavedContextProvider> */}
      <Rootlayout>
        <Component {...pageProps} />
      </Rootlayout>
      {/* </SavedContextProvider> */}
      {/* </SearchContextProvider> */}
      {/* </FormContextProvider> */}
      {/* </AuthContextProvider> */}
    </Provider>
  );
}
