import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { makeOrder } from '../../actions/shop';
import { useDispatch } from 'react-redux';
import { getCart } from '../../actions.js';

const StripeButton = ({ price, isSuccess }) => {
	const dispatch = useDispatch();
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_cVXNOMFKm72eQ8UYdSSeXEfi005jajA9hc';
	const onToken = async (token) => {
		try {
			await makeOrder(token, priceForStripe);
			dispatch(getCart());
			isSuccess();
		} catch (error) {
			alert('Something went wrong');
			console.log(error);
		}
	};
	return (
		<StripeCheckout
			label='Pay Now'
			name='Royal Clothing'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeButton;
