import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";
import globalReducer from "./slices/global";
import userReducer from "./slices/user";
import professionReducer from "./slices/profession";
import availabilityReducer from "./slices/availability";
import meetingReducer from "./slices/meeting";
import staticReducer from "./slices/static";

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  profession: professionReducer,
  availability: availabilityReducer,
  meeting: meetingReducer,
  static: staticReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
