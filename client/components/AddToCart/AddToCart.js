import { Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCart } from '../../actions';

import React from 'react';

export default function AddToCart({ product, qty = 1, isFluid = true }) {
	const dispatch = useDispatch();
	const cartId = useSelector((state) => state.cart.cartId);

	const handleClick = (evt) => {
		evt.stopPropagation();
		// Dipatch update cart action
		dispatch(updateCart(cartId, product._id, qty));
	};
	return (
		<Button onClick={handleClick} primary fluid={isFluid}>
			ADD TO CART
		</Button>
	);
}
