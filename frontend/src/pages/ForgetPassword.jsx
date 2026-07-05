import React from 'react';
import { Link } from 'react-router-dom';

function ForgetPassword() {
    return (
        <>
            <section className="forgot-password">
                <h2>Reset Your Password</h2>
                <form>
                    <label htmlFor="email">Enter Your Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />

                    <button type="submit">Send Reset Link</button>
                </form>

                <p className="back-login">Remembered your password? <Link to="/login.html">Login here</Link></p>
            </section>
        </>
    );
}

export default ForgetPassword;
