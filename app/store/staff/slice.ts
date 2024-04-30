"use client"
import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import { Staff } from "./interfaces";

let initialState: Staff[];
if (typeof window !== 'undefined') {
    initialState = JSON.parse(localStorage.getItem('VCUser') || '[]');
} else {
    initialState = [];
}

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        loginStaff: (state, action: PayloadAction<Staff>) => {
            state.push(action.payload);
            localStorage.setItem('VCUser', JSON.stringify({
                id: action.payload.data?.id,
                token: action.payload.token,
            }));
            return state;
        },
        logoutStaff: (state, action) => {
            state = []
            localStorage.removeItem('VCUser');
            return state;
        }
    }
});

export default staffSlice.reducer;
export const { loginStaff, logoutStaff } = staffSlice.actions;
