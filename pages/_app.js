import "./../styles/global.css";
import { Provider } from "react-redux";
import store from "../redux/reduxStore";



export default function MyApp({ Component, pageProps }) {
    return <Provider store={store}> <Component {...pageProps} /> </Provider>
}