import { configureStore } from "@reduxjs/toolkit";
import addReducer from "./reducers";

export default configureStore({
  reducer: {
    addFibonacci: addReducer
  }
});
