import React from 'react';
import CollectionItem from '../CollectionItem/CollectionItem';

const CollectionPreview = ({ title, items }) => {
	return (
		<div className='CollectionPreview'>
			<h1 className='title'>{title.toUpperCase()}</h1>
			<div className='preview'>
				{items
					.filter((item, i) => i < 4)
					.map((item) => (
						<CollectionItem key={item.id} item={item} />
					))}
			</div>

			<style jsx>{`
				.CollectionPreview {
					display: flex;
					flex-direction: column;
					margin-bottom: 30px;
				}

				.preview {
					display: flex;
					justify-content: space-between;
				}

				.title {
					font-size: 28px;
					margin-bottom: 25px;
				}

				@media screen and (max-width: 768px) {
					.preview {
						flex-wrap: wrap;
					}
					.collection-item {
						margin-bottom: 30px;
					}
				}
			`}</style>
		</div>
	);
};

export default CollectionPreview;
