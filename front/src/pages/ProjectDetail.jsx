import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { fetchProjects } from '../store/slices/projectSlice';

const ProjectDetail = () => {
    //estraiamo id da url
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.projects);

    //se la lista è vuota forza il download
    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProjects());
        }
    }, [dispatch, items.length]);

    //trova il progetto specifico, useparams restituisce una stringa
    const project = items.find((p) => p.id === parseInt(id));

    if (isLoading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (!project && !isLoading) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">Progetto non trovato.</Alert>
                <Button as={Link} to="/projects">Torna all'elenco</Button>
            </Container>
        );
    }

    //se project è vuoto setto già su null per sicurezza
    if (!project) return null;

    return (
        <Container className="mt-4">
            <Card className="shadow border-0">
                <Card.Body className="p-5">
                    <Card.Title className="display-6 fw-bold mb-3">{project.title}</Card.Title>
                    <Card.Subtitle className="text-muted mb-4 fs-5">
                        Analista: {project.author?.name} {project.author?.surname}
                    </Card.Subtitle>
                    <hr />
                    {/*pre-line mantiene gli a capo inseriti nella textarea del form */}
                    <Card.Text style={{ whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: '1.8' }} className="mt-4">
                        {project.description}
                    </Card.Text>
                    
                    <div className="mt-4">
                        {project.primaryLanguage && (
                            <Badge bg="secondary" className="fs-6 p-2 me-2">
                                Linguaggio Principale: {project.primaryLanguage}
                            </Badge>
                        )}
                    </div>
                    
                    <div className="mt-5 d-flex gap-3">
                        {project.githubUrl && (
                            <Button variant="dark" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                Visualizza su GitHub
                            </Button>
                        )}
                        {project.liveUrl && (
                            <Button variant="primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                Demo Live
                            </Button>
                        )}
                        <Button variant="outline-secondary" as={Link} to="/projects">
                            Torna ai Progetti
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProjectDetail;