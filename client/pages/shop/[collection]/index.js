import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { getCollectionBySlug, getCollections } from '../../../actions/shop';

import styles from './collection.module.scss';

import ProductList from '../../../components/ProductList/ProductList';
import Loader from '../../../components/Loader/Loader';
import CardCollection from '../../../components/CardCollection/CardCollection';

const CollectionPage = ({
	collection,
	totalProducts,
	hasNextPage,
	productsLimit,
}) => {
	const { name, products } = collection;
	const [limit, setLimit] = useState(productsLimit);
	const [page, setPage] = useState(1);
	const [loadedProducts, setLoadedProducts] = useState(products);
	const [isNextPage, setIsNextPage] = useState(hasNextPage);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoad = async () => {
		try {
			const newPage = page + 1;
			setIsLoading(true);
			const response = await getCollectionBySlug(collection.slug, {
				page: newPage,
				limit,
			});
			if (!response.pagination.next) {
				setIsNextPage(false);
			}
			setLoadedProducts([...loadedProducts, ...response.data.products]);
			setPage(newPage);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return isLoading ? (
		<Loader />
	) : (
		<div className={styles['CollectionPage']}>
			<div className={styles['title']}>
				<h2>{name}</h2>
			</div>
			{loadedProducts.length ? (
				<div>
					<CardCollection items={loadedProducts} />
					{/* <ProductList products={loadedProducts} /> */}
				</div>
			) : (
				<div className={styles['no-products']}>
					<p>No Products to show. Check back later.</p>
					<Icon name='shopping basket' size='huge' />
				</div>
			)}
			{isNextPage ? (
				<div className={styles['load-more']}>
					<Button disabled={isLoading} onClick={handleLoad}>
						Load More
					</Button>
				</div>
			) : null}
		</div>
	);
};

export async function getStaticProps({ params }) {
	const page = 1;
	const limit = 2;

	const response = await getCollectionBySlug(params.collection, {
		page,
		limit,
	});
	const collection = response.data;
	const totalProducts = response.total;
	const hasNextPage = response.pagination.hasOwnProperty('next');

	return {
		props: { collection, totalProducts, hasNextPage, productsLimit: limit },
	};
}

export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const collections = await getCollections();
	const sections = collections.data;

	// Get the paths we want to pre-render based on posts
	const paths = sections.map(({ slug }) => ({
		params: { collection: slug },
	}));

	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export default CollectionPage;
