import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <h4 className="text-white text-lg font-semibold">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Me</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white text-lg font-semibold">View Website in</h4>
                        <ul className="space-y-2">
                            <li><span className="text-white">English</span></li>
                        </ul>
                    </div>


                    <div className="space-y-4">
                        <h4 className="text-white text-lg font-semibold">Connect with Us</h4>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="#" className="hover:text-white transition-colors duration-200" aria-label="Github">
                                    <FaGithub className="w-6 h-6" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                                    <FaLinkedin className="w-6 h-6" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm">© 2024 STAR. All Rights Reserved.</p>
                        <ul className="flex space-x-6">
                            <li><a href="#" className="text-sm hover:text-white transition-colors duration-200">Terms Of Use</a></li>
                            <li><a href="#" className="text-sm hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm hover:text-white transition-colors duration-200">FAQ</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;