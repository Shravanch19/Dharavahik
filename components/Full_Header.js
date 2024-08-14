"use client"
import SearchBar from "./SearchBar";
import { useState } from "react";
import Modal from "./Modal";

const Full_Header = () => {
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);

    const handleMovieSubmit = async (movieName, isWebSeries) => {
        setShowModal(false);

        const apiEndpoint = isWebSeries ? '/api/Insert_TV' : '/api/Insert';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    movieName: movieName
                })
            });

            const data = await response.json();
            console.log(data);

            if (data.response) {
                window.location.href = `/movie?query=${data.response}`;
            } else {
                console.error('No Id found in the response');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <div className='Nav bg-black text-textPrimary flex justify-between items-center sm:w-[98.75vw] w-[100vw] h-[10vh] border-b border-highlight '>
            <div className='logo md:ml-9 ml-5'>
                <a href="/">
                    <img src="/logo.png" alt="Logo" className="w-12 p-0" />
                </a>
            </div>
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white sm:font-bold sm:text-base py-2 px-4 rounded md:ml-28 ml-5"
            >
                <img src="https://cdn.vectorstock.com/i/1000v/77/36/artificial-intelligence-ai-icon-vector-23097736.jpg" alt="AI" className="w-5 h-5 mr-2" />
                AI
            </button>
            <SearchBar/>
            <Modal show={showModal} onClose={handleModalClose} onSubmit={handleMovieSubmit} />
        </div>
    );
};

export default Full_Header;
