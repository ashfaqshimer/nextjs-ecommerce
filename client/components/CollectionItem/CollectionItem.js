import React from 'react';

import {
	CollectionItemContainer,
	BackgroundImage,
	CollectionFooterContainer,
	NameContainer,
	PriceContainer,
	AddButton,
} from './CollectionItem.styles';

const CollectionItem = ({ item, addItem }) => {
	const { name, price, imageUrl } = item;
	return (
		<CollectionItemContainer>
			<BackgroundImage className='image' imageUrl={imageUrl}></BackgroundImage>
			<CollectionFooterContainer>
				<NameContainer>{name}</NameContainer>
				<PriceContainer>{price}</PriceContainer>
			</CollectionFooterContainer>
			<AddButton onClick={() => console.log('add Item')} inverted>
				Add to cart
			</AddButton>
		</CollectionItemContainer>
	);
};

export default CollectionItem;
