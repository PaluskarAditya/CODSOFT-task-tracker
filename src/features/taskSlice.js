import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: 'tasks',
  initialState: JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter(el => el.id !== action.payload);
    },
    update(state, action) {
      return state.map(el => el.id === action.payload.id ? { ...el, text: action.payload.text } : el);
    },
    toggle(state, action) {
      return state.map(el => el.id === action.payload.id ? { ...el, completed: !action.payload.completed } : el);
    }
  }
});

export const { add, remove, update, toggle } = taskSlice.actions;
export default taskSlice.reducer;