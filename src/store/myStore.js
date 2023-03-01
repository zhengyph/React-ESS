import { configureStore } from '@reduxjs/toolkit';

import cartSlice from "./slices/cartSlice";
import loginSlice from "./slices/loginSlice";
import profileSlice from "./slices/profileSlice";

const myStore = configureStore({
	reducer: {
		login_slice: loginSlice.reducer,
		profile_slice: profileSlice.reducer,
		cart_slice: cartSlice.reducer
	},
});

export default myStore;
