import styled from 'styled-components';
import CustomButton from '../CustomButton/CustomButton';

export const CollectionItemContainer = styled.div`
	width: 20vw;
	display: flex;
	flex-direction: column;
	height: 350px;
	align-items: center;
	position: relative;

	&:hover {
		.image {
			opacity: 0.8;
		}
		button {
			opacity: 0.85;
			display: flex;
		}
	}
	@media screen and (max-width: 768px) {
		width: 40vw;
		margin-bottom: 10px;
	}
`;

export const BackgroundImage = styled.div`
	width: 100%;
	height: 95%;
	background-size: cover;
	background-position: center;
	background-image: ${({ imageUrl }) => `url(${imageUrl})`};
	margin-bottom: 5px;
`;

export const AddButton = styled(CustomButton)`
	width: 80%;
	opacity: 0.7;
	position: absolute;
	top: 255px;
	display: none;
`;

export const CollectionFooterContainer = styled.div`
	width: 100%;
	height: 5%;
	display: flex;
	justify-content: space-between;
	font-size: 18px;
`;

export const NameContainer = styled.div`
	width: 90%;
	margin-bottom: 15px;
`;

export const PriceContainer = styled.div`
	width: 10%;
	text-align: right;
`;
