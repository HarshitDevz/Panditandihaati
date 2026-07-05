import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <section className="login">
                <h2>Login</h2>
                <form>
                    <label htmlFor="username">Username or Email</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />

                    <button type="submit">Login</button>
                </form>

                <p className="signup-link">Don’t have an account? <Link to="/signup.html">Sign up here</Link></p>
                <p className="forgot-link">Forgot your password? <Link to="/forget.html">Reset it here</Link></p>
            </section>
        </>
    );
}

export default Login;
