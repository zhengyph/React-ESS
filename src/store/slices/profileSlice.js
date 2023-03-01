import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		usr_first_name: 'Hao',
		usr_last_name: 'Zheng',
		usr_birthday: '1990 MAY 06',
		usr_address: '',
		usr_province: '',
		usr_country: 'Canada',
		usr_contact: '',
		usr_department: '',
		usr_role: 'Junior Software Developer'
	},
	reducers: {
		setAddress: (state, action) => {
			state.usr_address = action.payload;
		},
		setProvince: (state, action) => {
			state.usr_province = action.payload;
		},
		setContact: (state, action) => {
			state.usr_contact = action.payload;
		},
		setDepartment: (state, action) => {
			state.usr_department = action.payload;
		}
	},
});

export const { setAddress, setProvince, setContact, setDepartment } = profileSlice.actions;

export default profileSlice;
