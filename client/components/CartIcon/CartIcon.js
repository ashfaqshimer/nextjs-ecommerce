// import './CartIcon.scss';
import Image from 'react-bootstrap/Image';

import { useSelector, useDispatch } from 'react-redux';

import { toggleCart } from '../../actions';

const CartIcon = () => {
	const dispatch = useDispatch();
	const totalQuantity = useSelector((state) => state.cart.totalQuantity);
	const handleClick = () => dispatch(toggleCart);
	return (
		<div className='CartIcon' onClick={handleClick}>
			<img className='shopping-icon' src='/11.3 shopping-bag.svg' />
			<span className='item-count'>{totalQuantity}</span>

			<style jsx>{`
				.CartIcon {
					width: 45px;
					height: 45px;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}
				.item-count {
					position: absolute;
					font-size: 10px;
					font-weight: bold;
					bottom: 12px;
				}
				.shopping-icon {
					width: 30px;
					height: 30px;
				}
			`}</style>
		</div>
	);
};

export default CartIcon;
