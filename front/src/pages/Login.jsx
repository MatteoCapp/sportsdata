import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(formData)).unwrap();
            // Dopo il login, reindirizziamo alla dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error("Errore di login:", err);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <h2 className="mb-4">Accedi</h2>
                    {error && <Alert variant="danger">{typeof error === 'string' ? error : 'Credenziali non valide'}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" name="email" 
                                value={formData.email} onChange={handleChange} required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" name="password" 
                                value={formData.password} onChange={handleChange} required 
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" disabled={isLoading} className="w-100">
                            {isLoading ? 'Accesso in corso...' : 'Login'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;