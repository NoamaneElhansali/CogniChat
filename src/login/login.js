import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifiaction_login } from '../pages/session';
export const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const nav = useNavigate()
    const User = useSelector(state=>state.session.user)

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
        if(dispatch(verifiaction_login({email:email,password:password}))){
            if(User.email !== email || User.password !== password){
                newErrors.verification="Email or Password not valid !!"
            }
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            nav('/home')
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
                        {errors.verification && <p className="error">{errors.verification}</p>}
                    </div>
                    <div className="partie-input">
                        <div className="coolinput">
                            <label htmlFor="email" className="text">Email address</label>
                            <input type="text" autoFocus onChange={(e)=>setEmail(e.target.value)} name="email" className="input" />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="coolinput">
                            <label htmlFor="password" className="text">Password</label>
                            <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} className="input" />
                            {errors.password && <p className="error">{errors.password}</p>}
                        </div>
                    </div>
                    <div className="partie-button-c">
                        <button className="button-Continue" onClick={handleSignup}>Continue</button>
                        <p>Don’t have an account? <Link className='lien-signup' to="/signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
