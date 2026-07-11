import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// SHA-256 hash of: admin#panditan16@
const HASH = '0c420ff201615b53debbe1a76aebba935c7a5c960254065d29aa2ef1b0547d89';

async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const hashed = await sha256(password);
        if (hashed === HASH) {
            localStorage.setItem('pdh_admin_session', 'true');
            navigate('/epadmin/dashboard');
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fffdf6] px-4">
                <motion.div
                    className={`max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100`}
                    animate={error ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                <div className="text-center mb-8">
                    <img src="images/LOGO.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
                    <p className="text-gray-500">Please enter your password</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Admin Password"
                            className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#ff9800] transition-all`}
                        />
                        {error && <p className="text-red-500 text-sm mt-2 text-center">Incorrect password. Please try again.</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ff9800] text-white py-3 rounded-xl font-bold hover:bg-[#e65100] transition-colors shadow-lg"
                    >
                        Login to Dashboard
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-gray-400">
                    &copy; 2026 Panditan Di Hatti — Admin Secure Access
                </p>
            </motion.div>

            {/* Framer Motion handles the shake animation */}
        </div>
    );
}

export default AdminLogin;
