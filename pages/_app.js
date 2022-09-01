import "../styles/globals.css";
import { GameProvider } from "../components/Game";

function MyApp({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}

export default MyApp;
