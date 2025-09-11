import { createSlice } from '@reduxjs/toolkit';
import { storage } from './index';

interface UserState {
  hasLoggedIn: boolean;
}

const initialState: UserState = {
  hasLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setHasLoggedIn: (state, action) => {
      state.hasLoggedIn = action.payload;
    },

    logout: () => {
      storage.clearAll();
      return initialState;
    },
  },
});

export const { setHasLoggedIn, logout } = userSlice.actions;
export default userSlice.reducer;
