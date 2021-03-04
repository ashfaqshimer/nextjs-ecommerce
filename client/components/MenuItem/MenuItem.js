import { withRouter } from 'next/router';
import Link from 'next/link';

import styles from './MenuItem.module.scss';

const MenuItem = ({ name, slug, imageUrl }) => {
	return (
		<Link href={'/shop/[collection]'} as={`/shop/${slug}`}>
			<div className={styles.MenuItem}>
				<div
					className={styles['background-image']}
					style={{ background: `url(${imageUrl})` }}
				/>
				<div className={styles.content}>
					<h1 className={styles.title}>{name.toUpperCase()}</h1>
					<span className={styles.subtitle}>Shop Now</span>
				</div>
			</div>
		</Link>
	);
};

export default withRouter(MenuItem);
