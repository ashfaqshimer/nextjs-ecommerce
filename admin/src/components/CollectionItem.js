import React, { useState } from 'react';
import axios from 'axios';

export default function CollectionItem({ collection, handleDelete }) {
	const [formValue, setFormValue] = useState({
		name: collection.name,
		description: collection.description,
		imageUrl: collection.imageUrl,
		slug: collection.slug,
	});

	const handleChange = (evt) => {
		setFormValue({ ...formValue, [evt.target.name]: evt.target.value });
	};
	const handleUpdate = async (evt) => {
		const response = await axios.put(
			`/api/v1/collections/${collection._id}`,
			formValue
		);
		console.log(response);
	};

	return (
		<>
			<tr>
				<td>{collection._id}</td>
				<td>
					<input
						name='name'
						value={formValue.name}
						onChange={handleChange}
					></input>
				</td>
				<td>
					<input
						name='description'
						value={formValue.description}
						onChange={handleChange}
					></input>
				</td>
				<td>
					<input
						name='imageUrl'
						value={formValue.imageUrl}
						onChange={handleChange}
					></input>
				</td>
				<td>
					<input
						name='slug'
						value={formValue.slug}
						onChange={handleChange}
					></input>
				</td>

				<td>
					<button class='btn btn-secondary' onClick={handleUpdate}>
						Update
					</button>
				</td>
				<td>
					<button className='btn btn-danger' onClick={handleDelete}>
						X
					</button>
				</td>
			</tr>
		</>
	);
}
