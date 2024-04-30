import { configureStore } from "@reduxjs/toolkit";
import { staffSlice } from "./staff/slice";

export const store = configureStore({
    reducer: {
        staff: staffSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
