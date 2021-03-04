import { Item, Label, Input, Button } from 'semantic-ui-react';
import AddToCart from '../AddToCart/AddToCart';
import AddProductToCart from './AddProductToCart';
import { useState } from 'react';
import { checkAuth } from '../../utils/auth';
import { Link } from 'next/link';

function ProductSummary(product) {
	const { name, imageUrl, _id, price, sku, user } = product;
	const [quantity, setQuantity] = useState(1);
	return (
		<Item.Group>
			<Item>
				<Item.Image size='medium' src={imageUrl} />
				<Item.Content>
					<Item.Header>{name}</Item.Header>
					<Item.Description>
						<Label className='p-3 mb-5'>SKU: {sku}</Label>
						<p className='font-weight-bold'>Price : ${price}</p>
					</Item.Description>
					<Item.Extra>
						<Input
							type='number'
							min='1'
							placeholder='Quantity'
							value={quantity}
							onChange={(event) => setQuantity(Number(event.target.value))}
						/>
						{checkAuth() ? (
							<AddToCart
								product={product}
								quantity={quantity}
								isFluid={false}
							/>
						) : (
							<Button primary>Sign Up To Purchase</Button>
						)}
					</Item.Extra>
				</Item.Content>
			</Item>
		</Item.Group>
	);
}

export default ProductSummary;
