import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		usr_email: '',
		usr_password: '',
		is_signed_in: false
	},
	reducers: {
		setEmail: (state, action) => {
			state.usr_email = action.payload;
		},
		setPassword: (state, action) => {
			state.usr_password = action.payload;
		},
		signIn: (state) => {
			state.is_signed_in = true;
		},
		signOut: (state) => {
			state.is_signed_in = false;
		}
	},
});

export const { setEmail, setPassword, signIn, signOut } = loginSlice.actions;

export default loginSlice;