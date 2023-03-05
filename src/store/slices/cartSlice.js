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
				// 先将 item 的 is_selected 属性设置为相反的值
				state.item_list[index].is_selected = !state.item_list[index].is_selected;
				// 再检查当取消选中一个商品时，当前是否所有商品都已经选中。如果是，则将 all_selected 更新为 false
				if (!state.item_list.every(item => item.is_selected)) {
					state.all_selected = false;
				}
				// 最后据其 is_selected 的值更新 total_price 的值
				state.total_price += state.item_list[index].is_selected ? itemToToggle.a_price : -itemToToggle.a_price;
			}
		},
		handleToggleAllItems: (state) => {
			// 先将 all_selected 属性设置为相反的值
			state.all_selected = !state.all_selected;
			// 再根据 all_selected 的值来更新 item_list 数组中每个商品的 is_selected 属性
			state.item_list = state.item_list.map(item => ({
				...item, is_selected: state.all_selected
			}));
			// 最后根据 all_selected 的值来更新 total_price 的值
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
// 	// 将 all_selected 属性设置为 true
// 	state.all_selected = true;
// 	// 设置每个 item 的 is_selected 属性为 true
// 	state.item_list = state.item_list.map(item => ({
// 		...item, is_selected: true
// 	}));
// 	// 更新 total_price 的值
// 	state.total_price = state.item_list.reduce((total, item) =>
// 		total + item.a_price, 0
// 	);
// },
// removeAllItems: (state) => {
// 	// 将 all_selected 属性设置为 false
// 	state.all_selected = false;
// 	// 设置每个 item 的 is_selected 属性为 false
// 	state.item_list = state.item_list.map(item => ({
// 		...item, is_selected: false
// 	}));
// 	// 更新 total_price 的值
// 	state.total_price = 0;
// },