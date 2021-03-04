import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './Header';
import HeadContent from './HeadContent';
import styles from '../../styles/Home.module.css';
import { getCart } from '../../actions';

const Layout = ({ children, user }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCart());
	}, [dispatch]);
	return (
		<>
			<Head>
				<HeadContent />
				{/* StyleSheets */}
				<link rel='stylesheet' type='text/css' href='/static/styles.css' />
				<link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
				<link
					rel='stylesheet'
					href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
				/>
				<script src='nprogress.js'></script>
				<title>Royal Clothing | One Stop Shop For Clothing</title>
			</Head>
			<Header />
			<Container>{children}</Container>
			<footer className={styles.footer}>
				<p>Created by Ashfaq Shimer 2020©</p>
			</footer>
		</>
	);
};

export default Layout;
