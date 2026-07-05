import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <>
            <section className="signup">
                <h2>Create an Account</h2>
                <form>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your full name" required />

                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Create a password" required />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="Re-enter your password" required />

                    <button type="submit">Sign Up</button>
                </form>

                <p className="login-link">Already have an account? <Link to="/login.html">Login here</Link></p>
            </section>
        </>
    );
}

export default Signup;
