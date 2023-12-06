/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./styles/login.css"
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function login() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setError(null);

            if (email !== '' && password !== '') {
                const response = await axios.post("http://localhost:30/auth/user_login", { email, password });
                console.log(response);
                swal("Success!", "Login successfully!", "success");
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.err || "An unexpected error occurred");
           
        }
    };

    return (
        <>


            <section className='sectionName'>

                <h3 className='logIN'>Log in to your Account</h3>
                <h4 className='welcome mt-2'>  Welcome back, please enter your details.</h4>
                <div className=" row align-items-start mt-5 py-5">
                    <div className="col-12 col-md-3 text-start">
                        <label className='email'>Email address</label>
                    </div>
                    <div className="col-12 col-md-9">
                        <input onChange={handleEmailChange}
                            type="email"
                            className={`form-control mt-1 ${error ? 'error-input' : ''} `}
                        />
                    </div>
                </div>
                <div className="mb-3 row align-items-start">
                    <div className={`col-12 col-md-3 text-start ${error ? 'error-label' : ''}`}>
                        <label className='password'>Password</label>

                    </div>
                    <div className={`col-12 col-md-9 mt-1 `}>
                        <div className="password-input">
                            <input
                                onChange={handlePasswordChange}
                                type={passwordVisible ? 'text' : 'password'}
                                className={`form-control ${error ? 'error-input' : ''} `}
                            />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
                <div className=" row">
                    <div className="custom-control custom-checkbox  text-start col-6">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label mx-2" htmlFor="customCheck1">
                            Remember me
                        </label>


                    </div>

                    <div className='col-6 d-flex align-items-center justify-content-end'>
                        <p className="forgot-password text-right">
                            Forgot password?
                        </p>
                    </div>

                </div>

                <div className="d-grid mt-3">
                    <button type="submit" className=" submitbtn" onClick={handleSubmit}>
                        Log in
                    </button>
                </div>

                <div className='mt-4'>
                    <p className="account">Don't have an account <a className='signup' href="/registration">Sign Up</a></p>
                </div>

            </section>
        </>
    )
}

export default login
