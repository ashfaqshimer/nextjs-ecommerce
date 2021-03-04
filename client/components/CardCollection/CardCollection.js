import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import AddToCart from '../AddToCart/AddToCart';
import { checkAuth } from '../../utils/auth';

export default function CardCollection({ items = [] }) {
	return (
		<div className='Card'>
			<CardGroup>
				{items.map((item) => {
					return (
						<Link
							key={item._id}
							href={'/products/[id]'}
							as={`/products/${item._id}`}
						>
							<Card>
								<Card.Img
									className='img-fluid'
									rounded='true'
									src={item.imageUrl}
								/>
								<Card.Body>
									<Card.Title>{item.name}</Card.Title>
									<Card.Text>{item.description}</Card.Text>
								</Card.Body>

								<Card.Footer className='font-weight-bold'>
									<p>$ {item.price}</p>
									{checkAuth() && <AddToCart product={item} />}
								</Card.Footer>
							</Card>
						</Link>
					);
				})}
			</CardGroup>
			<style jsx>
				{`
					.Card {
						margin-top: 2rem;
						cursor: pointer;
					}
				`}
			</style>
		</div>
	);
}
