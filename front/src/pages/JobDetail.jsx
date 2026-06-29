import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Badge, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { fetchJobAds } from '../store/slices/jobAdSlice';

//import per la mappa
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

//soluzione al problema di leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const JobDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.jobAds);

    useEffect(() => {
        if (items.length === 0) dispatch(fetchJobAds());
    }, [dispatch, items.length]);

    const job = items.find((j) => j.id === parseInt(id));

    if (isLoading) return <Container className="mt-5 text-center"><Spinner animation="border" variant="success" /></Container>;
    if (!job && !isLoading) return <Container className="mt-5"><Alert variant="danger">Annuncio non trovato.</Alert><Button as={Link} to="/jobs">Torna agli annunci</Button></Container>;
    if (!job) return null;

    return (
        <Container className="mt-4">
            <Card className="shadow border-0 border-top border-success border-5">
                <Card.Body className="p-5">
                    <Row className="mb-4">
                        <Col md={8}>
                            <Card.Title className="display-6 fw-bold text-success">{job.title}</Card.Title>
                            <h4 className="text-muted mt-2">{job.companyName}</h4>
                        </Col>
                        <Col md={4} className="text-md-end">
                            <Badge bg="info" className="text-dark fs-6 p-2 mb-2">📍 {job.location}</Badge><br />
                            <Badge bg="light" className="text-dark border fs-6 p-2">💰 {job.salaryRange || 'RAL da definire'}</Badge>
                        </Col>
                    </Row>
                    <hr />
                    <h5 className="mt-4 fw-bold">Descrizione della posizione:</h5>
                    <Card.Text style={{ whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: '1.8' }} className="mt-3 mb-4">
                        {job.description}
                    </Card.Text>

                    {/* SEZIONE MAPPA */}
                    {job.latitude && job.longitude && (
                        <div className="mb-5" style={{ height: '350px', width: '100%', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ccc' }}>
                            <MapContainer center={[job.latitude, job.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[job.latitude, job.longitude]}>
                                    <Popup>{job.companyName} - {job.location}</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    )}

                    <Button variant="success" size="lg" className="me-3">Candidati Ora</Button>
                    <Button variant="outline-secondary" size="lg" as={Link} to="/jobs">Torna agli Annunci</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default JobDetail;