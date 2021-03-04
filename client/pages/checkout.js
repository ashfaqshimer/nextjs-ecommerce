import CheckoutItem from '../components/CheckoutItem/CheckoutItem';
import StripeButton from '../components/StripeButton/StripeButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import styles from '../styles/CheckoutPage.module.scss';
import { Message } from 'semantic-ui-react';

const CheckoutPage = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);

	const [success, setSuccess] = useState(false);

	const calculateTotal = () => {
		const cartTotal = cartItems.reduce((acc, curr) => {
			acc += curr.quantity * curr.product.price;
			return acc;
		}, 0);
		return cartTotal.toFixed(2);
	};

	return (
		<div className={styles['CheckoutPage']}>
			{success && (
				<Message success header='Success!' content='Payment Successful!' />
			)}

			<div className={`row ${styles['checkout-header']}`}>
				<div className={`col-3 ${styles['header-block']}`}>
					<span>Product</span>
				</div>
				<div className={`col-3 ${styles['header-block']}`}>
					<span>Description</span>
				</div>
				<div className={`col-2 ${styles['header-block']}`}>
					<span>Quantity</span>
				</div>
				<div className={`col-3 ${styles['header-block']}`}>
					<span>Price</span>
				</div>
				<div className={`col-1 ${styles['header-block']}`}>
					<span>Remove</span>
				</div>
			</div>
			{cartItems &&
				cartItems.map((cartItem) => (
					<CheckoutItem key={cartItem.id} cartItem={cartItem} />
				))}
			<div className={styles['total']}>TOTAL: ${calculateTotal()}</div>
			<div className={styles['test-warning']}>
				*Please use the following test credit card for payments*
				<br />
				4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
			</div>
			<StripeButton
				price={calculateTotal()}
				isSuccess={() => setSuccess(true)}
			/>
		</div>
	);
};

export default CheckoutPage;
