import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobAds, searchJobAdsByLocation, deleteJobAd } from '../store/slices/jobAdSlice';

const Jobs = () => {
    const dispatch = useDispatch();
    const { items, isLoading, error } = useSelector((state) => state.jobAds);
    const { user } = useSelector((state) => state.auth); // Prendo l'utente loggato
    
    const [searchQuery, setSearchQuery] = useState('');
    
    //stato per modal
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchJobAds());
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            dispatch(fetchJobAds());
        } else {
            dispatch(searchJobAdsByLocation(searchQuery));
        }
    };

    const handleReset = () => {
        setSearchQuery('');
        dispatch(fetchJobAds());
    };

    //gestire l'eliminazione
    const openDeleteModal = (id) => {
        setItemToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            dispatch(deleteJobAd(itemToDelete));
        }
        setShowModal(false);
        setItemToDelete(null);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Annunci di Lavoro</h2>

            <Card className="mb-4 bg-light shadow-sm">
                <Card.Body>
                    <Form onSubmit={handleSearch} className="d-flex align-items-end">
                        <Form.Group className="flex-grow-1 me-3">
                            <Form.Label className="fw-bold">Filtra per Località (es. Milano)</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci una città..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="me-2" disabled={isLoading}>Cerca</Button>
                        <Button variant="outline-secondary" type="button" onClick={handleReset} disabled={isLoading || !searchQuery}>Reset</Button>
                    </Form>
                </Card.Body>
            </Card>

            {isLoading && <div className="text-center my-5"><Spinner animation="border" variant="success" /></div>}
            {error && <Alert variant="danger">Si è verificato un errore nel caricamento.</Alert>}
            {!isLoading && items.length === 0 && <Alert variant="warning">Nessun annuncio trovato.</Alert>}

            {!isLoading && items.length > 0 && (
                <Row xs={1} md={2} lg={2} className="g-4">
                    {items.map((job) => (
                        <Col key={job.id}>
                            <Card className="h-100 shadow-sm border-0 border-start border-success border-4">
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <Card.Title className="mb-0 text-success">{job.title}</Card.Title>
                                        <div className="d-flex gap-2 align-items-center">
                                            <Badge bg="info" className="text-dark">📍 {job.location}</Badge>
                                            {/* Tasto Cestino visibile solo all'autore */}
                                            {user && user.id === job.author?.id && (
                                                <Button variant="outline-danger" size="sm" onClick={() => openDeleteModal(job.id)} title="Elimina annuncio">
                                                    🗑️
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <Card.Subtitle className="mb-3 text-muted fw-bold">🏢 {job.companyName}</Card.Subtitle>
                                    <Card.Text className="flex-grow-1">
                                        {job.description.length > 150 ? `${job.description.substring(0, 150)}...` : job.description}
                                    </Card.Text>
                                    <div className="mt-2 text-muted small"><strong>💰 RAL:</strong> {job.salaryRange || 'Non specificata'}</div>
                                    <div className="mt-1 text-muted small"><em>Di: {job.author?.name}</em></div>
                                    <div className="mt-3 mt-auto">
                                        <Button as={Link} to={`/jobs/${job.id}`} variant="outline-success" size="sm" className="w-100">Vedi Dettagli</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/*conferma eliminazione*/}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Conferma Eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sei sicuro di voler eliminare questo annuncio? <strong>Questa azione è irreversibile.</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Annulla</Button>
                    <Button variant="danger" onClick={confirmDelete}>Sì, elimina definitivamente</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Jobs;