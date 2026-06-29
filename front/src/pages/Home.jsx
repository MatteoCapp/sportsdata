import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    //leggiamo il toke per vedere cosa mostrare
    const { token } = useSelector((state) => state.auth);

    return (
        <Container className="mt-5">
            {/*sezione di benvenuto*/}
            <Row className="mb-5 align-items-center bg-light p-5 rounded shadow-sm border-start border-primary border-5">
                <Col md={8}>
                    <h1 className="display-4 fw-bold text-primary">Benvenuto su SportsData</h1>
                    <p className="lead mt-3">
                        La prima piattaforma dedicata all'incontro tra <strong>Data Analyst Sportivi</strong> e <strong>Club Professionistici</strong>. 
                        Pubblica i tuoi modelli predittivi o trova il talento giusto per la tua squadra.
                    </p>
                    <div className="mt-4 gap-2 d-flex">
                        <Button as={Link} to="/projects" variant="primary" size="lg">
                            Esplora Progetti
                        </Button>
                        <Button as={Link} to="/jobs" variant="outline-success" size="lg">
                            Offerte di Lavoro
                        </Button>
                    </div>
                </Col>
                <Col md={4} className="text-center d-none d-md-block">
                    <span style={{ fontSize: '8rem' }}>⚽</span>
                </Col>
            </Row>

            {/*sezione delle features*/}
            <Row className="g-4 mb-5">
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm text-center">
                        <Card.Body>
                            <div className="display-5 mb-3">📊</div>
                            <Card.Title>Per gli Analisti</Card.Title>
                            <Card.Text>
                                Crea il tuo portfolio. Condividi repository GitHub e Demo Live delle tue analisi statistiche su giocatori e match.
                            </Card.Text>
                            {!token && (
                                <Button as={Link} to="/register" variant="primary" size="sm">
                                    Registrati come Analyst
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm text-center">
                        <Card.Body>
                            <div className="display-5 mb-3">🏟️</div>
                            <Card.Title>Per i Club</Card.Title>
                            <Card.Text>
                                Trova figure specializzate nella Match Analysis. Pubblica annunci di lavoro mirati per ruolo e città.
                            </Card.Text>
                            {!token && (
                                <Button as={Link} to="/register" variant="success" size="sm">
                                    Registrati come Recruiter
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm text-center">
                        <Card.Body>
                            <div className="display-5 mb-3">🤝</div>
                            <Card.Title>Community</Card.Title>
                            <Card.Text>
                                Una piattaforma open per far crescere l'uso dei Big Data nel mondo dello sport europeo.
                            </Card.Text>
                            {token && (
                                <Button as={Link} to="/dashboard" variant="dark" size="sm">
                                    Vai alla tua Dashboard
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;