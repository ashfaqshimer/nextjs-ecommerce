const CartItem = ({
	item: {
		product: { imageUrl, price, name },
		quantity,
	},
}) => {
	return (
		<div className='CartItem'>
			<img src={imageUrl} alt='item'></img>
			<div className='item-details'>
				<span className='name'>{name}</span>
				<span className='price'>
					{quantity} x ${price}
				</span>
			</div>
			<style jsx>{`
				.CartItem {
					width: 100%;
					display: flex;
					height: 80px;
					margin-bottom: 15px;
				}
				.item-details {
					width: 70%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					padding: 10px 20px;
				}
				img {
					width: 30%;
				}
				.name {
					font-size: 16px;
				}
			`}</style>
		</div>
	);
};

export default CartItem;
