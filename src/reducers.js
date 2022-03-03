import { createSlice } from "@reduxjs/toolkit";
import { Add } from "./helper.math";

const savedInitialState = {
  value: 0,
  color: "rgba(0,0,0,1)",
  calculations: null,
  active: false
};

export const addFibonacci = createSlice({
  name: "add",
  initialState: [savedInitialState],
  reducers: {
    increase: (state, action) => {
      state.push({
        value:
          state.length < 2
            ? state.length
            : state[state.length - 1].value + state[state.length - 2].value,
        color: "rgba(0,0,0,1)",
        active: true
      });
      for (let i = 0; i < state.length; i += 1) {
        if (i !== state.length - 1) {
          state[i].active = false;
        }
      }
      editColor(state.length - 1);
    },
    editColor: (state, action) => {
      for (let i = 0; i < state.length; i += 1) {
        if (
          i >= action.payload - 2 &&
          i <= action.payload &&
          state.length > 2
        ) {
          state[i].color = "rgba(0,200,50,1)";
        } else {
          state[i].color = "rgba(0,0,0,1)";
        }
      }
    },
    setActive: (state, action) => {
      //takes in the id and sets that state element to active and make all others false
      for (let i = 0; i < state.length; i += 1) {
        if (i === action.payload) {
          state[i].active = true;
        } else {
          state[i].active = false;
        }
      }
    },
    reset: (state, action) => {
      state.splice(0, state.length);
    }
  }
});

export const { increase, increaseBy, editColor, setActive, reset } =
  addFibonacci.actions;

export default addFibonacci.reducer;
