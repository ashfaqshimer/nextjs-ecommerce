import CollectionPreview from '../CollectionPreview/CollectionPreview';

const CollectionOverview = ({ collections }) => {
	return (
		<div className='CollectionOverview'>
			{collections.map(({ id, ...otherCollectionProps }) => (
				<CollectionPreview key={id} {...otherCollectionProps} />
			))}

			<style jsx>{`
				.CollectionOverview {
					display: flex;
					flex-direction: column;
				}
			`}</style>
		</div>
	);
};

export default CollectionOverview;
