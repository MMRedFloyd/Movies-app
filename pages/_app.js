import Rootlayout from "../components/Root";
import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import store from "../store/index";
import LoaderPages from "@/components/UI/LoaderPagesMirza";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Rootlayout>
        <LoaderPages>
          <Component {...pageProps} />
        </LoaderPages>
      </Rootlayout>
    </Provider>
  );
}
