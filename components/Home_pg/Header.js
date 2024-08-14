"use client"
import SearchBar from "../SearchBar"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";

const Header = () => {
    const hero_img = [
        "https://wallpapers.com/images/featured/harry-potter-desktop-vtho1d6dbpcfzv5v.jpg",
        "https://cdn.marvel.com/content/1x/mi_wallpaper_mas_dsk_01.jpg",
        "https://images8.alphacoders.com/107/thumb-1920-1073623.jpg",
        "https://wallpaper.dog/large/10785433.jpg"
    ];

    const [hero, setHero] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHero((prevHero) => (prevHero === hero_img.length - 1 ? 0 : prevHero + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const changeHeroLeft = () => {
        setHero(hero === 0 ? hero_img.length - 1 : hero - 1);
    };

    const changeHeroRight = () => {
        setHero(hero === hero_img.length - 1 ? 0 : hero + 1);
    };

    return (
        <section className='Hero-Section relative border-b border-white'>

            {/* Navbar */}
            <div className='Nav bg-background text-textPrimary flex justify-between items-center w-[80vw] h-18 p-2 absolute top-4 left-[50%] transform -translate-x-[50%] rounded-xl border border-highlight z-10'>
                <div className='logo'>
                    <a href="/">
                        <img src="/logo.png" alt="Logo" className="w-20 p-0 ml-4" />
                    </a>
                </div>
                <SearchBar />
            </div>

            {/* Hero Image */}
            <div className="sm:h-[90vh] h-[50vh] sm:w-[98.75vw] w-[100vw] overflow-hidden relative">
                <img src={hero_img[hero]} alt="Hero Image" className="w-full h-full object-cover transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            {/* Slider */}
            <section className='slider text-5xl font-bold text-textPrimary flex items-center gap-4 absolute bottom-10 left-[50%] transform -translate-x-[50%]'>
                <button onClick={changeHeroLeft} className="flex items-center justify-center sm:w-[3vw] w-[7vw] h-[5vh] rounded-full bg-white text-black text-xl">
                    <FaArrowLeft />
                </button>
                <h2 className='sm:text-3xl text-sm w-[60vw] sm:w-[30vw] text-center bg-black bg-opacity-50 px-4 py-2 rounded-lg'>All Your Favorites Here</h2>
                <button onClick={changeHeroRight} className="flex items-center justify-center sm:w-[3vw] w-[7vw] h-[5vh] rounded-full bg-white text-black text-xl">
                    <FaArrowRight />
                </button>
            </section>
        </section>
    );
}

export default Header;
