import ProductSummary from '../../../components/Product/ProductSummary';
import ProductAttributes from '../../../components/Product/ProductAttributes';

import { getProducts, getProductById } from '../../../actions/shop';

const ProductPage = ({ product, user }) => {
	return (
		<div className='ProductPage'>
			<ProductSummary user={user} {...product} />
			<ProductAttributes user={user} {...product} />
			<style jsx>{`
				.ProductPage {
					display: flex;
					flex-direction: column;
					padding: 2rem auto;
					margin: 2rem auto;
					height: 80vh;
				}
			`}</style>
		</div>
	);
};

export async function getStaticProps({ params }) {
	// Write an action to fetch the product by slug
	const response = await getProductById(params.id);
	return {
		props: { product: response.data },
	};
}

export async function getStaticPaths() {
	// Make call to fetch products
	const { data: products } = await getProducts();

	// Get the paths we want to pre-render based on posts
	const paths = products.map(({ _id }) => ({
		params: { id: _id },
	}));

	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export default ProductPage;
