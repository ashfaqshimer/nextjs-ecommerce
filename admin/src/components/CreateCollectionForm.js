import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function CreateCollectionForm({ toggleShow }) {
	const [formValue, setFormValue] = useState({
		name: '',
		description: '',
		imageUrl: '',
		slug: '',
	});
	const handleChange = (evt) => {
		setFormValue({ ...formValue, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = async (evt) => {
		await axios.post('/api/v1/collections', formValue);
		toggleShow();
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
				<Button onClick={handleSubmit}>Save</Button>
			</Form>
		</div>
	);
}
