import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Reducerlarınızı burada tanımlayın
  },
  extraReducers: (builder) => {
    // Ek reducerlarınızı burada tanımlayın
  },
});

export const { } = appSlice.actions; // Eğer action'larınız varsa burada destruct yapabilirsiniz

export default appSlice.reducer;
