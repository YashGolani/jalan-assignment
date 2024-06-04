import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Coordinates {
  x: number;
  y: number;
}

interface DrawingState {
  points: Coordinates[];
  undoStack: Coordinates[];
}

const initialState: DrawingState = {
  points: [],
  undoStack: [],
};

const drawingSlice = createSlice({
  name: "drawing",
  initialState,
  reducers: {
    addCoordinates: (state, action: PayloadAction<Coordinates>) => {
      state.points.push(action.payload);
      state.undoStack.push(action.payload);
    },
    clearCoordinates: (state) => {
      state.points = [];
      state.undoStack = [];
    },
    undo: (state) => {
      if (state.undoStack.length > 0) {
        const lastCoordinate = state.undoStack.pop();
        if (lastCoordinate) {
          state.points = state.points.filter(
            (point) =>
              point.x !== lastCoordinate.x || point.y !== lastCoordinate.y
          );
        }
      }
    },
  },
});

export const { addCoordinates, clearCoordinates, undo } = drawingSlice.actions;
export default drawingSlice.reducer;
