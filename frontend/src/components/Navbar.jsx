import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/Home" className="text-2xl font-semibold tracking-wide">
                    Task Management App
                </Link>
                <div className="flex items-center space-x-4">
                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-300"
                            >
                                Signup
                            </Link>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
