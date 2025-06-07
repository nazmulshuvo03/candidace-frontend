import store, { persistor } from "@/store";
import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { config } from "../../.config";
import { Navigation } from "@/components/Navigation";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
          <div
            className={`h-screen w-screen overflow-hidden bg-background text-text flex flex-col overflow-y-auto`}
          >
            <div className="w-full">
              <Navigation />
            </div>
            <div
              className="flex-1 flex overflow-x-hidden overflow-y-auto"
              style={{ height: "-webkit-fill-available" }}
            >
              <Component {...pageProps} />
            </div>
          </div>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}
