import { combineReducers } from 'redux';
import * as types from './types';

const initialCartState = {
	cartItems: [],
	totalQuantity: 0,
	cartId: null,
	showCart: false,
};

const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case types.TOGGLE_CART:
			return { ...state, showCart: !state.showCart };

		case types.SETCART:
			return {
				...state,
				cartItems: action.payload.products,
				totalQuantity: action.payload.products.reduce(
					(acc, curr) => acc + curr.quantity,
					0
				),
				cartId: action.payload._id,
			};

		case types.ADD_ITEMS:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload),
			};

		case types.REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload),
			};

		case types.CLEAR_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.id !== action.payload.id
				),
			};

		default:
			return state;
	}
};

// COMBINED REDUCERS
const reducers = {
	cart: cartReducer,
};

export default combineReducers(reducers);
