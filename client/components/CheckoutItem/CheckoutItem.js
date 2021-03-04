import { useDispatch, useSelector } from 'react-redux';
import { updateCart, deleteCartProduct } from '../../actions';

const CheckoutItem = ({ cartItem, clearItem }) => {
	const {
		product: { _id, imageUrl, price, name },
		quantity,
	} = cartItem;
	const dispatch = useDispatch();
	const cartId = useSelector((state) => state.cart.cartId);

	const handleAdd = (evt) => {
		// Dipatch update cart action
		dispatch(updateCart(cartId, _id, 1));
	};
	const handleRemove = (evt) => {
		// Dipatch update cart action
		dispatch(updateCart(cartId, _id, -1));
	};

	const handleDeleteItem = (evt) => {
		// Dipatch delete cart action
		dispatch(deleteCartProduct(cartId, _id));
	};

	const caculatePrice = () => (price * quantity).toFixed(2);

	return (
		<div className='CheckoutItem'>
			<div className='row align-items-center'>
				<div className='col-3 image-container'>
					<img src={imageUrl} alt='item' />
				</div>
				<div className='col-3 name'>{name}</div>
				<div className='col-2 quantity'>
					<span className='arrow' onClick={handleRemove}>
						&#10094;
					</span>
					{quantity}
					<span className='arrow' onClick={handleAdd}>
						&#10095;
					</span>
				</div>
				<div className='col-3 price'>$ {caculatePrice()}</div>
				<div className='col-1 remove-button' onClick={handleDeleteItem}>
					&#10005;
				</div>
			</div>
			<style jsx>{`
				.CheckoutItem {
					width: 100%;
					// display: flex;
					min-height: 100px;
					border-bottom: 1px solid darkgrey;
					padding: 15px 0;
					font-size: 20px;
					align-items: center;
				}
				img {
					width: 50%;
					// height: 100%;
				}
				.image-container {
					width: 23%;
					padding-right: 15px;
				}
				.name,
				.quantity,
				.price {
					width: 23%;
				}

				.arrow {
					cursor: pointer;
				}

				.quantity {
					padding-left: 20px;
				}

				.remove-button {
					padding-left: 12px;
					cursor: pointer;
				}
			`}</style>
		</div>
	);
};

export default CheckoutItem;
