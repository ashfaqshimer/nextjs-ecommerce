import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function UpdateProductForm({ toggleShow, product }) {
	const getCollections = async () => {
		const response = await axios.get('/api/v1/collections?select=_id,name');
		console.log('getCollections -> response', response);
		setCollections(response.data.data);
		// const collectionInfo = response.data.data.map((collection) => ({
		// 	id: collection.id,
		// 	name: collection.name,
		// }));
		console.log(product.productCollection);
	};
	useEffect(() => {
		getCollections();
	}, []);
	const [formValue, setFormValue] = useState({
		name: product.name,
		price: product.price,
		imageUrl: product.imageUrl,
		slug: product.slug,
		sku: product.sku,
		description: product.description,
		quantityAvailable: product.quantityAvailable,
		productCollection: product.productCollection._id,
	});
	const [collections, setCollections] = useState([]);
	const handleChange = (evt) => {
		setFormValue({ ...formValue, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = async (evt) => {
		await axios.put(`/api/v1/products/${product._id}`, formValue);
		toggleShow();
	};

	const handleSelect = async (evt) => {
		setFormValue({ ...formValue, productCollection: evt.target.value });
	};

	return (
		<div>
			<Form>
				<Form.Group controlId='exampleForm.ControlInput1'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						name='name'
						type='text'
						placeholder='Name'
						onChange={handleChange}
						value={formValue.name}
					/>
				</Form.Group>
				<Form.Group controlId='exampleForm.ControlInput1'>
					<Form.Label>SKU</Form.Label>
					<Form.Control
						name='sku'
						type='text'
						placeholder='SKU'
						onChange={handleChange}
						value={formValue.sku}
					/>
				</Form.Group>
				<Form.Group controlId='exampleForm.ControlInput1'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						name='description'
						type='text'
						placeholder='Description'
						onChange={handleChange}
						value={formValue.description}
					/>
				</Form.Group>
				<Form.Group controlId='exampleForm.ControlInput1'>
					<Form.Label>Price</Form.Label>
					<Form.Control
						name='price'
						type='number'
						placeholder='Price'
						onChange={handleChange}
						value={formValue.price}
					/>
				</Form.Group>
				<Form.Group controlId='exampleForm.ControlInput1'>
					<Form.Label>Quantity Available</Form.Label>
					<Form.Control
						name='quantityAvailable'
						type='number'
						placeholder='Quantity Available'
						onChange={handleChange}
						value={formValue.quantityAvailable}
					/>
				</Form.Group>
				<Form.Group controlId='exampleForm.ControlInput1'>
					<Form.Label>ImageUrl</Form.Label>
					<Form.Control
						name='imageUrl'
						type='text'
						placeholder='imageUrl'
						onChange={handleChange}
						value={formValue.imageUrl}
					/>
				</Form.Group>
				<Form.Group controlId='exampleForm.ControlInput1'>
					<Form.Label>Slug</Form.Label>
					<Form.Control
						name='slug'
						type='text'
						placeholder='Slug'
						onChange={handleChange}
						value={formValue.slug}
					/>
				</Form.Group>
				<Form.Group controlId='exampleForm.ControlInput1'>
					<Form.Label>Product Collection</Form.Label>
					<Form.Control
						as='select'
						value={formValue.productCollection}
						onChange={handleSelect}
					>
						{collections.map((collection) => (
							<option value={collection._id}>{collection.name}</option>
						))}
					</Form.Control>
				</Form.Group>
				<Button onClick={handleSubmit}>Update</Button>
			</Form>
		</div>
	);
}
