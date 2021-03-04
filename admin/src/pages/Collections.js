import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import CollectionItem from '../components/CollectionItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateCollectionForm from '../components/CreateCollectionForm';

export default function Collections() {
	const [collections, setCollections] = useState([]);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const loadCollections = async () => {
		const response = await axios.get('/api/v1/collections');
		console.log('loadCollections -> response', response.data);

		setCollections(response.data.data);
	};

	const deleteCollection = async (collectionId) => {
		await axios.delete(`/api/v1/collections/${collectionId}`);
		loadCollections();
	};

	const handleSave = async (collectionDetails) => {
		setShow(false);
		loadCollections();
	};

	useEffect(() => {
		loadCollections();
	}, []);
	return (
		<div>
			<Header />
			<div className='mt-5'>
				<h1 className='display-1 mb-3'>Collections</h1>
				<Button variant='primary' onClick={handleShow} size='large'>
					Create Collection
				</Button>
				<Table striped bordered hover className='mt-3'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Description</th>
							<th>ImageUrl</th>
							<th>Slug</th>
						</tr>
					</thead>
					<tbody>
						{collections.map((collection) => (
							<CollectionItem
								key={collection._id}
								collection={collection}
								handleDelete={() => deleteCollection(collection._id)}
							/>
						))}
					</tbody>
				</Table>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Create Collection</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<CreateCollectionForm toggleShow={() => handleSave()} />
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
}
