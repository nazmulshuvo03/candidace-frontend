import store, { persistor } from "@/store";
import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { config } from "../../.config";
import { Navigation } from "@/components/Navigation";
import { useRef } from "react";

export default function App({ Component, pageProps }) {
  const landingHowItWorksRef = useRef(null);
  const landingFaqsRef = useRef(null);

  const scrollToHowItWorks = () => {
    landingHowItWorksRef &&
      landingHowItWorksRef.current &&
      landingHowItWorksRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFaqs = () => {
    landingFaqsRef &&
      landingFaqsRef.current &&
      landingFaqsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
          <Navigation {...{ scrollToHowItWorks, scrollToFaqs }} />
          <Component {...pageProps} />;
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}
