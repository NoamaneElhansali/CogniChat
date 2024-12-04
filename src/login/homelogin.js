import './login.css'
import { Link } from 'react-router-dom';
export const HomeLogin = ()=>{
    return (
        <div className="Container-login">
            <div className="from-home-login">
                <div className="cont-home-log">
                        <div className="partie-logo">
                            <img src="/logo.png"/>
                        </div>
                        <div className="partie-text">
                            <h2 className="text-home-login-1">Welcome to CogniChat</h2>
                            <h2 className="text-home-login-2">Log in with your CogniChat account to continue</h2>
                        </div>
                        <div className="partie-button">
                            <Link className="lien-home-login" to="/login"><button className="button-home-login">Log in</button></Link>
                            <Link className='lien-home-login' to="/signup"><button className="button-home-sigup">Sign up</button></Link>
                        </div>
                </div>
            </div>
        </div>
    )
}