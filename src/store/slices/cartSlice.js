import { createSlice } from '@reduxjs/toolkit';

const ASSETS = [
	{a_id: "pc1",
		a_logo: {path: require("../../assets/image/pc1.jpg"), alt: "", width: "100", height: "100"},
		a_brand: "Lenovo ThinkPad", a_category: "Laptop",
		a_description: {size: "14 inch", memory: "8 GB", storage: "512 GB", processor: "Intel Core i5"},
		a_reviews: "4.6", a_price: 1599.99
	},
	{a_id: "pc2",
		a_logo: {path: require("../../assets/image/pc2.jpg"), alt: "", width: "100", height: "100"},
		a_brand: "Dell Inspiron", a_category: "Laptop",
		a_description: {size: "15 inch", memory: "8 GB", storage: "512 GB", processor: "Intel Core i5"},
		a_reviews: "4.9", a_price: 1688.88
	},
	{a_id: "ms1",
		a_logo: {path: require("../../assets/image/ms1.jpg"), alt: "", width: "100", height: "100"},
		a_brand: "Logitech", a_category: "Mouse",
		a_description: {switching: "1 device", connection: "USB/Bluetooth"},
		a_reviews: "5.0", a_price: 39.99
	},
	{a_id: "kb1",
		a_logo: {path: require("../../assets/image/kb1.jpg"), alt: "", width: "100", height: "100"},
		a_brand: "Razer", a_category: "Keyboard",
		a_description: {switching: "1 device", connection: "USB/Bluetooth"},
		a_reviews: "4.5", a_price: 66.66
	},
	{a_id: "mt1",
		a_logo: {path: require("../../assets/image/mt1.jpg"), alt: "", width: "100", height: "100"},
		a_brand: "Acer", a_category: "Monitor",
		a_description: {switching: "1 device", connection: "USB/Bluetooth"},
		a_reviews: "3.6", a_price: 299.99
	},
	{a_id: "ch1",
		a_logo: {path: require("../../assets/image/ch1.jpg"), alt: "", width: "100", height: "100"},
		a_brand: "IKEA", a_category: "Chair", a_description: {color: "black"},
		a_reviews: "4.2", a_price: 166.66
	},
	{a_id: "dk1",
		a_logo: {path: require("../../assets/image/dk1.jpg"), alt: "", width: "100", height: "100"},
		a_brand: "IKEA", a_category: "Desk", a_description: {color: "white"},
		a_reviews: "2.5", a_price: 199.99
	}
];

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		item_list: ASSETS.map(item => ({ ...item, is_selected: false })),
		total_price: 0,
		all_selected: false,
		is_over_budget: false
	},
	reducers: {
		handleToggleItem: (state, action) => {
			const itemToToggle = action.payload;
			const index = state.item_list.findIndex(
				item => item.a_id === itemToToggle.a_id
			);
			if (index !== -1) {
				// ?????? item ??? is_selected ???????????????????????????
				state.item_list[index].is_selected = !state.item_list[index].is_selected;
				// ?????????????????????????????????????????????????????????????????????????????????????????????????????? all_selected ????????? false
				if (!state.item_list.every(item => item.is_selected)) {
					state.all_selected = false;
				}
				// ???????????? is_selected ???????????? total_price ??????
				state.total_price += state.item_list[index].is_selected ? itemToToggle.a_price : -itemToToggle.a_price;
			}
		},
		handleToggleAllItems: (state) => {
			// ?????? all_selected ???????????????????????????
			state.all_selected = !state.all_selected;
			// ????????? all_selected ??????????????? item_list ???????????????????????? is_selected ??????
			state.item_list = state.item_list.map(item => ({
				...item, is_selected: state.all_selected
			}));
			// ???????????? all_selected ??????????????? total_price ??????
			state.total_price = state.all_selected ?
				state.item_list.reduce((total, item) => total + item.a_price, 0) : 0;
		},
		overBudget: (state, action) => {
			state.is_over_budget = action.payload;
		}
	}
});

export const { handleToggleItem, handleToggleAllItems, overBudget } = cartSlice.actions;

export default cartSlice;

// addItem: (state, action) => {
// 	const itemToAdd = action.payload;
// 	const index = state.item_list.findIndex(item => item.a_id === itemToAdd.a_id);
// 	if (index !== -1) {
// 		state.item_list[index].is_selected = true;
// 		state.total_price += itemToAdd.a_price;
// 	}
// },
// removeItem: (state, action) => {
// 	const itemToRemove = action.payload;
// 	const index = state.item_list.findIndex(item => item.a_id === itemToRemove.a_id);
// 	if (index !== -1) {
// 		state.item_list[index].is_selected = false;
// 		state.total_price -= itemToRemove.a_price;
// 	}
// },
// addAllItems: (state) => {
// 	// ??? all_selected ??????????????? true
// 	state.all_selected = true;
// 	// ???????????? item ??? is_selected ????????? true
// 	state.item_list = state.item_list.map(item => ({
// 		...item, is_selected: true
// 	}));
// 	// ?????? total_price ??????
// 	state.total_price = state.item_list.reduce((total, item) =>
// 		total + item.a_price, 0
// 	);
// },
// removeAllItems: (state) => {
// 	// ??? all_selected ??????????????? false
// 	state.all_selected = false;
// 	// ???????????? item ??? is_selected ????????? false
// 	state.item_list = state.item_list.map(item => ({
// 		...item, is_selected: false
// 	}));
// 	// ?????? total_price ??????
// 	state.total_price = 0;
// },