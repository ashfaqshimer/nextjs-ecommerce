import MenuItem from '../MenuItem/MenuItem';

import styles from './Directory.module.scss';

// This component will consist of the MenuItem components
const Directory = ({ sections = [] }) => {
	return (
		<div className={styles.Directory}>
			<div className={styles.menuItems}>
				{sections.map(({ id, ...otherSectionProps }) => (
					<MenuItem key={id} {...otherSectionProps} />
				))}
			</div>
		</div>
	);
};

export default Directory;
