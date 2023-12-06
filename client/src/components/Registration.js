/* eslint-disable no-restricted-globals */
import "./styles/registerpage.css";
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import swal from 'sweetalert';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Registration() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setcPassword] = useState("");
    const [registrationType, setRegistrationType] = useState('');
    const [emailLogin, setemailLogin] = useState('');
    const [passwordLogin, setpasswordLogin] = useState('');


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const handleRegistrationTypeChange = (event) => {
        setRegistrationType(event.target.value);
    };

    const handleFullnameChange = (event) => {
        setFullname(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleCPasswordChange = (event) => {
        setcPassword(event.target.value);
    }

    const loginEmail = (event) => {
        setemailLogin(event.target.value)
    }

    const loginPassword = (event) => {
        setpasswordLogin(event.target.value)
    }
    const navigate = useNavigate();

    const dataFrom_form = {
        "name": fullname,
        "email": email,
        "password": password,
        "accountType": registrationType

    }



    const handleSubmit = () => {

        if (fullname !== '' && email !== '' && password !== '' && Cpassword !== '' && password === Cpassword && registrationType !== '') {

            axios.post("http://localhost:30/auth/user_registration", dataFrom_form).then((res) => {
                console.log(res);
                swal("Success!", "Registed successfully!", "success");
                navigate("/")
            }).catch((err) => {
                console.log(err);
                swal("Err", "ERR", "error");

            })

        } else {
            swal("Err", "ERR", "error");
        }
    }

    const loginCred = {
        "email": emailLogin,
        "password": passwordLogin
    }

    console.log(emailLogin);
    console.log(passwordLogin);

    const loginSubmit = () => {
        try {
            axios.post("http://localhost:30/auth/user_login", loginCred).then((res) => {
                console.log(res);
                swal("Success!", "Login successfully!", "success");
                navigate("/")
            }).catch((err) => {
                console.log("FFFFFFFFFF",err);
                swal({
                    title: "Error",
                    text: `ERR: ${err.response.data.err }`,
                    icon: "error"
                });

                console.log("NNNNNNNNNNNN",err.response.data.err);
            })

        }
        catch (err) {
            console.log("err.response.data.err",err.response.data.err);
            swal({
                title: "Errors",
                text: `ERR: ${err.response.data.err}`,
                icon: "error"
            });
        }

    }




    return (
        <div>
            <div className="container set">
                <div className="row justify-content-between smScreen">

                    <div className="col-12 col-sm-7 pl-4 mainDiv">

                        <h5 className='mt-5 Register_today d-none d-sm-block' style={{ textAlign: 'left' }}>Register today.</h5>

                        <h3 className=' d-sm-none small_screen_head' >Create an account</h3>
                        <h5 className=' d-sm-none details'>Please enter your details.</h5>

                        <div className="row mt-sm-5">
                            <div className="col-12 col-sm-6 text-start mt-4 ">
                                <label htmlFor="fullName" className='fullname'>Full Name:</label>
                                <input onChange={handleFullnameChange} required type="text" id="fullName" name="fullName" className="form-control fullnameText_box mt-3 " />
                            </div>

                            <div className="col-12 col-sm-6 text-start mt-4">
                                <label htmlFor="email" className='email_id' >Email Id:</label>
                                <input type="text" onChange={handleEmailChange} required id="email" name="email" className="form-control mt-3" />
                            </div>

                            <div className="col-12 col-sm-6 text-start mt-lg-4 mt-4">
                                <label htmlFor="password" className='password mt-lg-4'>Password:</label>
                                <div className={`password-input ${showPassword ? 'visible' : ''}`}>
                                    <input onChange={handlePasswordChange} required
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="form-control mt-3"
                                    />
                                    <span className="password-toggle" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEyeSlash color="#193B67" /> : <FaEye color="#193B67" />}
                                    </span>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6 text-start mt-lg-4 mt-4">
                                <label htmlFor="confirmPassword" className='cpassword mt-lg-4'>Confirm Password:</label>
                                <div className={`password-input ${showConfirmPassword ? 'visible' : ''}`}>
                                    <input onChange={handleCPasswordChange} required
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control mt-3"
                                    />
                                    <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                                        {showConfirmPassword ? <FaEyeSlash color="#193B67" /> : <FaEye color="#193B67" />}
                                    </span>
                                </div>
                            </div>

                            <div className="col-12 col-md-2 registerAS mt-4">
                                <span className="mr-3">Register as :</span>
                            </div>
                            <div className="col-12 col-md-10 registerAS seeker mt-4">
                                <span>
                                    <input
                                        type="radio"
                                        name="registrationType"
                                        value="Jobseeker"
                                        className="mr-1"
                                        checked={registrationType === 'Jobseeker'}
                                        onChange={handleRegistrationTypeChange}
                                    />
                                    <label htmlFor="" className="mr-3 px-2">Jobseeker</label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        name="registrationType"
                                        value="Recruiter"
                                        className="mr-1"
                                        checked={registrationType === 'Recruiter'}
                                        onChange={handleRegistrationTypeChange}
                                    />
                                    <label htmlFor="" className="mr-3 px-2">Recruiter</label>
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        name="registrationType"
                                        value="Employee"
                                        checked={registrationType === 'Employee'}
                                        onChange={handleRegistrationTypeChange}
                                    />
                                    <label htmlFor="" className='px-2'>Employee</label>
                                </span>
                            </div>

                            <div className="col-12 col-md-4 mt-4 regButton mt-4">
                                <button className='signUP' onClick={handleSubmit}>Register</button>
                            </div>

                            <div className="col-12 d-block d-sm-none mt-3">
                                <span className='already_have'>Already have an account? </span>  <a href="/login" className='Spanlogin'>Login</a>
                            </div>
                        </div>

                    </div>

                    <div className="col-5 d-none d-md-flex d-lg-none mt-5">
                        <span className="vertical-line"></span>
                        <div className="row">
                            <h4 className="mt-auto mb-2 already">Already registered?</h4>
                            <h3 className="mb-3 acc">Log in to your Account</h3>
                        </div>
                    </div>

                    <div className="col-5 d-none d-lg-flex mt-5 ">
                        <span className="vertical-line"></span>
                        <div className="row">
                            <h4 className="mt-auto mb-2 already">Already registered?</h4>
                            <h3 className="mb-3 Lgacc">Log in to your Account</h3>
                            <div className="col-12 col-sm-12 text-start ">
                                <label htmlFor="email" className='email_id'>Email Address:</label>
                                <input type="text" onChange={loginEmail} required id="email" name="email" className="form-control mt-1" />
                            </div>
                            <div className="col-12 col-sm-12 text-start  ">
                                <label htmlFor="password" className='password mt-lg-4'>Password:</label>
                                <div className={`password-input ${showPassword ? 'visible' : ''}`}>
                                    <input onChange={loginPassword} required
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="form-control mt-1" />
                                    <span className="password-toggle" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEyeSlash color="#193B67" /> : <FaEye color="#193B67" />}
                                    </span>
                                </div>
                            </div>

                            <div className="text-start d-flex align-items-center ">
                                <div className="col">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck1"
                                    />
                                    <label className="custom-control-label mx-2" htmlFor="customCheck1">
                                        Remember me
                                    </label>
                                </div>
                                <div className="col">
                                    <p className="forgot-password text-right">
                                        Forgot password?
                                    </p>
                                </div>
                                <div className="col">
                                    <button type="submit" className=" submitbtnInReg" onClick={loginSubmit}>
                                        Log in
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>




                </div>
            </div>
        </div>
    );
}

export default Registration;
