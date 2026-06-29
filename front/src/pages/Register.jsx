import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        role: 'ROLE_ANALYST' //ruolo di default
    });
    const [localError, setLocalError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (formData.password.length < 8) {
            setLocalError('La password deve contenere almeno 8 caratteri.');
            return;
        }

        try {
            await dispatch(registerUser(formData)).unwrap();
            navigate('/login');
        } catch (err) {
            console.error("Errore di registrazione:", err);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <h2 className="mb-4">Registrazione Account</h2>
                    {(localError || error) && <Alert variant="danger">{localError || (typeof error === 'string' ? error : 'Errore durante la registrazione')}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        {/*scelta ruolo*/}
                        <Form.Group className="mb-4 p-3 bg-light rounded border">
                            <Form.Label className="fw-bold mb-3">Ruolo?</Form.Label>
                            <Form.Check 
                                type="radio"
                                id="role-analyst"
                                name="role"
                                label="Sport Analyst"
                                value="ROLE_ANALYST"
                                checked={formData.role === 'ROLE_ANALYST'}
                                onChange={handleChange}
                                className="mb-2"
                            />
                            <Form.Check 
                                type="radio"
                                id="role-recruiter"
                                name="role"
                                label="Recruiter"
                                value="ROLE_CLUB_RECRUITER"
                                checked={formData.role === 'ROLE_CLUB_RECRUITER'}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" name="surname" value={formData.surname} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isLoading} className="w-100 mt-2">
                            {isLoading ? 'Registrazione in corso...' : 'Registrati'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;