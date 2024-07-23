import React from 'react';
import './Houses.css';
import Link from 'next/link';

const Houses = () => {
    let imgs = [
        { house: "marvel", img: "https://w0.peakpx.com/wallpaper/445/496/HD-wallpaper-marvel-comics-logo-marvel-comics-marvel-logo.jpg" },
        { house: "HP", img: "https://i.pinimg.com/564x/d2/f4/c1/d2f4c1d25c462f750e8a8e0d2c67a6e5.jpg" },
        { house: "Pirates", img: "https://images6.alphacoders.com/614/614315.jpg" },
        { house: "disney", img: "https://e1.pxfuel.com/desktop-wallpaper/363/253/desktop-wallpaper-disney-logo-top-46-disney-logo-backgrounds-nice-logo-disney.jpg" },
    ]
    return (
        <div className='Houses z-10 flex justify-evenly gap-4 sm:gap-6'>
            {imgs.map((img, index) => (
                <div
                    key={index}
                    className='House'>
                    <Link href={`/House?house=${img.house}`}>
                        <img
                            src={img.img}
                            alt={img.house}
                            className='House_img'
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Houses;
