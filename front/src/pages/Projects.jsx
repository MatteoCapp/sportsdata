import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, deleteProject } from '../store/slices/projectSlice';

const Projects = () => {
    const dispatch = useDispatch();
    const { items, isLoading, error } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const openDeleteModal = (id) => {
        setItemToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            dispatch(deleteProject(itemToDelete));
        }
        setShowModal(false);
        setItemToDelete(null);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Portfolio dei Data Analyst</h2>

            {isLoading && <div className="text-center my-5"><Spinner animation="border" variant="primary" /></div>}
            {error && <Alert variant="danger">Errore nel caricamento.</Alert>}
            {!isLoading && items.length === 0 && <Alert variant="info">Nessun progetto pubblicato.</Alert>}

            {!isLoading && items.length > 0 && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {items.map((project) => (
                        <Col key={project.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <Card.Title>{project.title}</Card.Title>
                                        {user && user.id === project.author?.id && (
                                            <Button variant="outline-danger" size="sm" onClick={() => openDeleteModal(project.id)}>
                                                🗑️
                                            </Button>
                                        )}
                                    </div>
                                    <Card.Subtitle className="mb-2 text-muted small">Autore: {project.author?.name}</Card.Subtitle>
                                    <Card.Text className="flex-grow-1">
                                        {project.description.length > 120 ? `${project.description.substring(0, 120)}...` : project.description}
                                    </Card.Text>
                                    
                                    <div className="mt-3">
                                        {project.primaryLanguage && <Badge bg="secondary" className="me-2">{project.primaryLanguage}</Badge>}
                                    </div>
                                    <div className="mt-3 mt-auto">
                                        <Button as={Link} to={`/projects/${project.id}`} variant="outline-primary" size="sm" className="w-100">Vedi Dettagli</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/*eliminazione progetto*/}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Conferma Eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sei sicuro di voler eliminare questo progetto? <strong>Azione irreversibile.</strong></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Annulla</Button>
                    <Button variant="danger" onClick={confirmDelete}>Sì, elimina</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Projects;