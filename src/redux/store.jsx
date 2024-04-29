import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../feature/Counter/counterSlice";
const store = configureStore({
    reducer: {
        counter:counterSlice.reducer,
    },
});

export default store;