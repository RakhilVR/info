import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import LoginModel from './loginModel';
import React, { useState, useRef } from 'react';

import "./styles/navbar.css"

function AppNavbar() {

    
    const location = useLocation();
    const isRegistrationRoute = location.pathname === '/registration';
    const navigate = useNavigate();

    const loginModelRef = useRef();

    const regpage = () => {
        navigate("/registration")
    }

    const [showLoginModel, setShowLoginModel] = useState(false);

    const handleLoginClick = () => {
        setShowLoginModel(true);
        if (loginModelRef.current) {
            loginModelRef.current.handleShow();
        }
    };

    const handleLoginModelClose = () => {
        setShowLoginModel(false);
    };


    return (
        <>
            {['sm'].map((expand) => (
                <Navbar key={expand} expand={expand} className=" nav">
                    <Container className='contan'>
                        <Navbar.Brand href="/">
                            <img
                                src="/img/Group 4.jpg"
                                className="d-inline-block align-top logo"
                                alt="Your Logo"
                            />
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <img
                                            src="/img/Group 4.jpg"
                                            className="d-inline-block align-top logo"
                                            alt="Your Logo"
                                        />
                                    </div>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <div className="line"></div>
                            <Offcanvas.Body>
                                {isRegistrationRoute ? (
                                    <>
                                        <Nav className="justify-content-end align-items-center flex-grow-1 pe-3 text-center text-sm-end">
                                            <Nav.Link href="/" className="me-3 me-sm-6 employer">Home</Nav.Link>
                                            <Nav.Link href="#action2" className="me-3 me-sm-6 recruter">Browse Jobs</Nav.Link>
                                            <Nav.Link href="#action1" className="me-3 me-sm-6 job_seeker"> Browse Candidates</Nav.Link>
                                            <Nav.Link href="#action1" className="me-3 me-sm-6 about">For Jobseeker</Nav.Link>
                                            <Nav.Link href="#action1" className="me-3 me-sm-6 faq">For Jobseekers</Nav.Link>
                                            <Nav.Link href="#action1" className="me-5 me-sm-6 faq">For Recruiters</Nav.Link>
                                            <Nav.Link href="#action1" className="me-5 me-sm-4 loginREG" >Login</Nav.Link>
                                        </Nav>



                                        <Form className="d-flex">
                                            <button className='Register_button'><a className='regtag' href="/registration">Register</a> </button>
                                        </Form>




                                    </>
                                ) : (
                                    <>

                                        <Nav className="justify-content-end align-items-center flex-grow-1 pe-3 text-center text-sm-end">
                                            <Nav.Link href="#action1" className="me-5 me-sm-6 employer">For Employer</Nav.Link>
                                            <Nav.Link href="#action2" className="me-5 me-sm-6 recruter">For Recruiter</Nav.Link>
                                            <Nav.Link href="#action1" className="me-5 me-sm-6 job_seeker">For Jobseeker</Nav.Link>
                                            <Nav.Link href="#action1" className="me-5 me-sm-6 about">About us</Nav.Link>
                                            <Nav.Link href="#action1" className="me-5 me-sm-6 faq">FAQ’s</Nav.Link>
                                            <Nav.Link onClick={handleLoginClick} className="me-5 me-sm-6 login d-none d-sm-block">Login</Nav.Link>
                                        </Nav>


                                        <Form className="d-none d-sm-flex">
                                            <button className='Register_button' onClick={regpage}><a className='regtag' href="/registration">Register</a></button>
                                        </Form>

                                        <div className="row d-flex d-sm-none pages">
                                            <div className="col-6 text-center">
                                                <Nav.Link href="/login" className="me-5 me-sm-6 about">Login</Nav.Link>
                                            </div>
                                            <div className="col-6 text-center">
                                                <Nav.Link href="/registration" className="me-5 me-sm-6 login">Register</Nav.Link>
                                            </div>
                                        </div>

                                        {showLoginModel && <LoginModel ref={loginModelRef} onClose={handleLoginModelClose} onShow={() => { }} />}
                                    </>
                                )}
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default AppNavbar;
