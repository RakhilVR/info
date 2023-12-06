// LoginModel.js
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import "./styles/loginModel.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const LoginModel = forwardRef(({ onClose, onShow }, ref) => {
    const [show, setShow] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setemail] = useState("");
    const [error, setError] = useState(null);

    const handleClose = () => {
        setShow(false);
        onClose();
    };


    const navigate = useNavigate();

    const handleShow = () => {
        setShow(true);
        onShow();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useImperativeHandle(ref, () => ({
        handleShow,
    }));

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const emailChange = (event) => {
        setemail(event.target.value);
    };
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleSubmit = async () => {
        try {
            setError(null);

            if (email !== '' && password !== '') {
                const response = await axios.post("http://localhost:30/auth/user_login", { email, password });
                console.log(response);
                swal("Success!", "Login successfully!", "success")
                    .then(() => {
                        handleRefresh();
                    });

            }
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.err || "An unexpected error occurred");
        }
    };




    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Body>
                    <div className={`row ${error ? 'is-invalid' : ''}`}>
                        <div className="container">
                            <label htmlFor="" className='Email'>
                                Email Address:
                            </label>
                            <input
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                onChange={emailChange}
                                type="text"
                            />
                            <label htmlFor="" className='passwordLOG mt-4'>
                                Password
                            </label>
                            <div className="input-group">
                                <input
                                    onChange={handlePasswordChange}
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className={`form-control mt-3 ${error ? 'is-invalid' : ''}`}
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash color="#193B67" /> : <FaEye color="#193B67" />}
                                </span>

                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <div className="text-start d-flex align-items-center mt-2">
                                <div className="col">
                                    <input
                                        type="checkbox"
                                        className={`custom-control-input ${error ? 'is-invalid' : ''}`}
                                        id="customCheck1"
                                    />
                                    <label className={`remember mx-2 }`} htmlFor="customCheck1">
                                        Remember me
                                    </label>
                                </div>
                                <div className="col">
                                    <p className="text-right forG">
                                        Forgot password?
                                    </p>
                                </div>
                                <div className="col">
                                    <button type="submit" onClick={handleSubmit} className="LOG mt-1">
                                        Log in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
});

export default LoginModel;
