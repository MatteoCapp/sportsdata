import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../store/slices/projectSlice';

const CreateProject = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        githubUrl: '',
        liveUrl: ''
    });
    const [successMsg, setSuccessMsg] = useState('');
    
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isLoading, error } = useSelector((state) => state.projects);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        
        try {
            await dispatch(createProject({ 
                authorId: user.id, 
                projectData: formData 
            })).unwrap();
            
            setSuccessMsg('Progetto pubblicato con successo!');
            setFormData({ title: '', description: '', githubUrl: '', liveUrl: '' }); // Resetta il form
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>Pubblica un nuovo Progetto</Card.Title>
                {error && <Alert variant="danger">{typeof error === 'string' ? error : 'Errore'}</Alert>}
                {successMsg && <Alert variant="success">{successMsg}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Titolo Progetto *</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrizione *</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>URL Repository GitHub</Form.Label>
                        <Form.Control type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="https://github.com/..." />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>URL Live (Opzionale)</Form.Label>
                        <Form.Control type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Pubblicazione...' : 'Pubblica'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreateProject;