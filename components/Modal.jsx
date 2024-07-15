"use client"
import React, { useState } from 'react';

const Modal = ({ show, onClose, onSubmit }) => {
    const [movieName, setMovieName] = useState('');
    const [isWebSeries, setIsWebSeries] = useState(false);

    if (!show) {
        return null;
    }

    const handleSubmit = () => {
        onSubmit(movieName, isWebSeries);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">Enter Movie Name</h2>
                <input
                    type="text"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                />
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={isWebSeries}
                        onChange={(e) => setIsWebSeries(e.target.checked)}
                        className="mr-2"
                    />
                    <label>Is this a web series?</label>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
