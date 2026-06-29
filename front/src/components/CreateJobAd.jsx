import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createJobAd } from '../store/slices/jobAdSlice';

const CreateJobAd = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        companyName: '',
        location: '',
        salaryRange: ''
    });
    const [successMsg, setSuccessMsg] = useState('');
    
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isLoading, error } = useSelector((state) => state.jobAds);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        
        try {
            await dispatch(createJobAd({ 
                authorId: user.id, 
                jobAdData: formData 
            })).unwrap();
            
            setSuccessMsg('Annuncio di lavoro pubblicato con successo!');
            // reset del form
            setFormData({ title: '', description: '', companyName: '', location: '', salaryRange: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>Pubblica un nuovo Annuncio di Lavoro</Card.Title>
                {error && <Alert variant="danger">{typeof error === 'string' ? error : 'Errore durante il salvataggio'}</Alert>}
                {successMsg && <Alert variant="success">{successMsg}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Titolo della Posizione *</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} placeholder="es. Data Analyst Sportivo" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nome Club / Azienda *</Form.Label>
                        <Form.Control type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Località *</Form.Label>
                        <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} placeholder="es. Milano" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Budget / Range Salariale</Form.Label>
                        <Form.Control type="text" name="salaryRange" value={formData.salaryRange} onChange={handleChange} placeholder="es. €30k - €40k" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrizione del Ruolo e Requisiti *</Form.Label>
                        <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} required />
                    </Form.Group>

                    <Button variant="success" type="submit" disabled={isLoading}>
                        {isLoading ? 'Pubblicazione...' : 'Pubblica Annuncio'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreateJobAd;