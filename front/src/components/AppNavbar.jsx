import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const AppNavbar = () => {
    // lettura dello stato di redux
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //logout e rreindirezzamento alla pagina di login
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                {/*as={Link} c'è per unire Bootstrap e il routing di react */}
                <Navbar.Brand as={Link} to="/">SportsData</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/projects">Progetti</Nav.Link>
                        <Nav.Link as={Link} to="/jobs">Annunci Lavoro</Nav.Link>
                    </Nav>
                    <Nav>
                        {/*pezzo per loggato o non loggato*/}
                        {token ? (
                            <>
                                <Navbar.Text className="me-3">
                                    Ciao, <strong>{user?.name}</strong> ({user?.role?.replace('ROLE_', '')})
                                </Navbar.Text>
                                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Button variant="outline-danger" onClick={handleLogout} className="ms-2 btn-sm my-auto">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Registrati</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;