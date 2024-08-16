import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // root key for localStorage
  storage, // storage engine to use
};

export default persistConfig;
