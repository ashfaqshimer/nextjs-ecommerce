import CustomButton from '../CustomButton/CustomButton';
import CartItem from '../CartItem/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toggleCart } from '../../actions';

const CartDropdown = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const cartItems = useSelector((state) => state.cart.cartItems);

	const handleCheckout = () => {
		dispatch(toggleCart());
		router.push('/checkout');
	};

	return (
		<div className='CartDropdown'>
			<div className='cart-items'>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem._id} item={cartItem} />
					))
				) : (
					<span className='empty-message'>Your cart is empty.</span>
				)}
			</div>
			<CustomButton onClick={handleCheckout}>GO TO CHECKOUT</CustomButton>

			<style jsx>{`
				.CartDropdown {
					position: absolute;
					width: 240px;
					height: 340px;
					display: flex;
					flex-direction: column;
					padding: 20px;
					border: 1px solid black;
					background-color: white;
					top: 90px;
					right: 40px;
					z-index: 5;
				}
				.empty-message {
					font-size: 18px;
					margin: 50px auto;
				}
				.cart-items {
					height: 240px;
					display: flex;
					flex-direction: column;
					overflow: auto;
				}
				button {
					margin-top: auto;
				}
			`}</style>
		</div>
	);
};

export default CartDropdown;
