import React from 'react';

const Houses = () => {
    let imgs = [
        {house : "marvel", img : "https://w0.peakpx.com/wallpaper/445/496/HD-wallpaper-marvel-comics-logo-marvel-comics-marvel-logo.jpg"},
        {house : "HP", img : "https://i.pinimg.com/564x/d2/f4/c1/d2f4c1d25c462f750e8a8e0d2c67a6e5.jpg"},
        {house : "Pirates", img : "https://images6.alphacoders.com/614/614315.jpg"},
        {house : "disney", img : "https://e1.pxfuel.com/desktop-wallpaper/363/253/desktop-wallpaper-disney-logo-top-46-disney-logo-backgrounds-nice-logo-disney.jpg"},
    ]
    return (
        <div className='Houses flex justify-evenly sm:gap-6 gap-3 z-10 sm:my-12 my-8'>
            {imgs.map((img) => (
                <div className='House border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden sm:h-[30vh] sm:w-[22vw] h-[12vh] w-[20vw]'>
                    <a href={`/House?house=${img.house}`}>
                        <img src={img.img} alt={img.house} className='House_img w-full h-full object-cover hover:scale-110 transition-transform duration-500 ease-in-out' />
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Houses;
