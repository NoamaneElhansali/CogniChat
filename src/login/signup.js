import { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddUser } from '../pages/session';

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const nav = useNavigate()
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignup = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!validateEmail(email)) {
            newErrors.email = "Invalid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (!validatePassword(password)) {
            newErrors.password = "Password must be at least 8 characters long, include a number and a special character.";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            dispatch(AddUser({email:email,password:password}))
            nav('/login')
        }
    };

    return (
        <div className="Container-login">
            <div className="from-home-login">
                <div className="form-log">
                    <div className="partie-logo">
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <div className="partie-text">
                        <h1>Welcome back</h1>
                    </div>
                    <div className="partie-input">
                        <div className="coolinput">
                            <label htmlFor="email" className="text">Email address</label>
                            <input
                                type="text"
                                autoFocus
                                name="email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="coolinput">
                            <label htmlFor="password" className="text">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                        </div>
                        <div className="coolinput">
                            <label htmlFor="confirmPassword" className="text">Confirm password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                    <div className="partie-button-c">
                        <button className="button-Continue" onClick={handleSignup}>Continue</button>
                        <p>I have an account? <Link className="lien-signup" to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
