import '../../styles/shop.module.scss';
import Directory from '../../components/Directory/Directory';
import { getCollections } from '../../actions/shop';

function HomePage({ sections }) {
	return (
		<div className='HomePage'>
			<Directory sections={sections} />
		</div>
	);
}

export async function getStaticProps() {
	const collections = await getCollections();
	const sections = collections.data;

	return {
		props: {
			sections,
		},
	};
}

export default HomePage;
