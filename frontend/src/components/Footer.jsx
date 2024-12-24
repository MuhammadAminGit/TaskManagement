import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-3">
            <div className="container mx-auto flex justify-between items-center text-sm">
                <div>
                    <p>&copy; {new Date().getFullYear()} Amin. All Rights Reserved.</p>
                </div>
            
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-white transition duration-300">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-white transition duration-300">
                        Terms of Service
                    </a>
                    <a href="#" className="hover:text-white transition duration-300">
                        Contact Us
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
