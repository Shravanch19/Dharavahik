import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Full_Header from '@/components/Full_Header';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Full_Header />
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">About Us</h1>
                    <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
                        We are passionate about creating innovative solutions that make a difference in people's lives.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Mission Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                        <p className="text-lg text-gray-600">
                            Our mission is to develop cutting-edge solutions that empower businesses and individuals
                            to achieve their goals. We believe in creating technology that is both powerful and
                            accessible to everyone.
                        </p>
                    </div>

                    {/* Values Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="flex-shrink-0 h-6 w-6 text-blue-600">•</span>
                                <span className="ml-3 text-lg text-gray-600">Innovation in everything we do</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 h-6 w-6 text-blue-600">•</span>
                                <span className="ml-3 text-lg text-gray-600">Quality and excellence in our work</span>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 h-6 w-6 text-blue-600">•</span>
                                <span className="ml-3 text-lg text-gray-600">Customer satisfaction as our priority</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
                                <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
                                <p className="text-gray-600">Founder & CEO</p>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        <FaGithub className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-gray-900">
                                        <FaLinkedin className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* Add more team members as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About; 