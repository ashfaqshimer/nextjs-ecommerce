import * as types from './types';

import { getUserCart, updateUserCart, deleteCartItem } from './actions/shop';

// Toggle Cart dropdown
export const toggleCart = () => ({ type: types.TOGGLE_CART });

// Fetch cart
export const getCart = () => async (dispatch) => {
	if (process.browser) {
		if (window.localStorage.getItem('user')) {
			const user = JSON.parse(window.localStorage.getItem('user'));
			const response = await getUserCart(user);

			dispatch({ type: types.SETCART, payload: response.data });
		}
	}
};

// Update cart
export const updateCart = (cartId, productId, quantity) => async (dispatch) => {
	if (process.browser) {
		if (window.localStorage.getItem('user')) {
			const response = await updateUserCart(cartId, productId, quantity);
			dispatch({ type: types.SETCART, payload: response.data });
		}
	}
};

// Update cart
export const deleteCartProduct = (cartId, productId) => async (dispatch) => {
	if (process.browser) {
		if (window.localStorage.getItem('user')) {
			const response = await deleteCartItem(cartId, productId);
			dispatch({ type: types.SETCART, payload: response.data });
		}
	}
};
