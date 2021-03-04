import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UpdateProductForm from './UpdateProductForm';

export default function ProductItem({ product, handleDelete, reload }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSave = async () => {
		setShow(false);
		reload();
	};

	return (
		<>
			<tr>
				<td>{product._id}</td>
				<td>{product.sku}</td>
				<td>{product.name}</td>
				<td>{product.quantityAvailable}</td>
				<td>{product.productCollection.name}</td>

				<td>
					<button class='btn btn-secondary' onClick={handleShow}>
						Update
					</button>
				</td>
				<td>
					<button className='btn btn-danger' onClick={handleDelete}>
						X
					</button>
				</td>
			</tr>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Update Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UpdateProductForm
						product={product}
						toggleShow={() => handleSave()}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
