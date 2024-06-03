import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Points {
  x: number;
  y: number;
}

interface DrawingState {
  points: Points[];
}

const initialState: DrawingState = {
  points: [],
};

const drawingSlice = createSlice({
  name: "drawing",
  initialState,
  reducers: {
    addCoordinates: (state, action: PayloadAction<Points>) => {
      state.points.push(action.payload);
    },
    clearCoordinates: (state) => {
      state.points = [];
    },
  },
});

export const { addCoordinates, clearCoordinates } = drawingSlice.actions;
export default drawingSlice.reducer;
