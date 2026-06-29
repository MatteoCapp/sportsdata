import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CreateProject from '../components/CreateProject';
import CreateJobAd from '../components/CreateJobAd';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user) return null;

    const displayRole = user.role === 'ROLE_CLUB_RECRUITER' ? 'Recruiter' : 'Data Analyst';

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h2>Dashboard Personale</h2>
                    <p className="lead">Benvenuto, {user.name}. Ruolo: <strong>{displayRole}</strong></p>
                </Col>
            </Row>

            <Row className="g-4">
                {/*tutti possono creare un annunci di lavoro */}
                <Col md={12} lg={6}>
                    <CreateJobAd />
                </Col>

                {/*solo gli analyst pubblicano progetti */}
                {user.role === 'ROLE_ANALYST' && (
                    <Col md={12} lg={6}>
                        <CreateProject />
                    </Col>
                )}
                
                {/*opzione admin, messa per il futuro eventuale */}
                {user.role === 'ROLE_ADMIN' && (
                    <Col md={12}>
                        <Card className="mt-4 border-danger">
                            <Card.Body>
                                <Card.Title className="text-danger">Pannello di Amministrazione</Card.Title>
                                <Card.Text>Hai accesso completo alla gestione degli utenti e dei contenuti.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Dashboard;