import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/language-slice";
import translateReducer from "./slices/translate-slice";

const store = configureStore({
  reducer: { languageReducer, translateReducer },
});

export default store;
