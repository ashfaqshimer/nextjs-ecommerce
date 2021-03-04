import Head from 'next/head';
import styles from '../styles/Home.module.css';
import customStyles from '../styles/Index.module.scss';
import Link from 'next/link';

import { getBestSellerProducts, getLatestProducts } from '../actions/shop';
import CardCollection from '../components/CardCollection/CardCollection';

export default function Home({ bestSellers, latestProducts }) {
	return (
		<div>
			<Head>
				<title>Royal Clothing | One Stop Shop For Clothing</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<header id={customStyles['showcase']}>
				<div class={customStyles['showcase-content']}>
					<h1 class={customStyles['l-heading']}>
						Your One Stop Shop For All Your Clothing!
					</h1>
					<p class={customStyles['lead']}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
						accusantium distinctio repudiandae sed, placeat natus eveniet
						ratione aliquid labore velit.
					</p>
					<Link href='/shop'>
						<a class={customStyles['btn']}>Shop Now</a>
					</Link>
				</div>
			</header>
			<main className={styles.main}>
				<div className={styles.bestSellers}>
					<h1 className={styles.title}>Best Sellers</h1>
					<CardCollection items={bestSellers} />
				</div>
				<hr className={styles.rule} />
				<h1 className={styles.title}>New Releases</h1>
				<CardCollection items={latestProducts} />
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const getBestSellerResponse = await getBestSellerProducts();
	const bestSellers = getBestSellerResponse.data;

	const getLatestResponse = await getLatestProducts();
	const latestProducts = getLatestResponse.data;

	return {
		props: {
			bestSellers,
			latestProducts,
		},
	};
}
