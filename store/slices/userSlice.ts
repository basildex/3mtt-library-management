import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  role: 'librarian' | 'member'; // Can be librarian or member
}

const initialState: UserState = {
  role: 'member', // Default to "member"
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<'librarian' | 'member'>) => {
      state.role = action.payload; // Set role based on login or context
    },
  },
});

export const { setUserRole } = userSlice.actions;
export default userSlice.reducer;
