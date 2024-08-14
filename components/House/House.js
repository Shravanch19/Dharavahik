"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import "./House.css";

const House = () => {
    const [imgLink, setImgLink] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        const queryParam = searchParams.get("house");

        const imgLinks = {
            marvel: "https://w0.peakpx.com/wallpaper/445/496/HD-wallpaper-marvel-comics-logo-marvel-comics-marvel-logo.jpg",
            HP: "https://i.pinimg.com/564x/d2/f4/c1/d2f4c1d25c462f750e8a8e0d2c67a6e5.jpg",
            Pirates: "https://images6.alphacoders.com/614/614315.jpg",
            disney: "https://wallpapers.com/images/hd/walt-disney-castle-laptop-h9vph62ew8wzv1q2.jpg",
        };

        setImgLink(imgLinks[queryParam] || "");

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/house?query=${queryParam}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (queryParam) {
            fetchData();
        }
    }, [searchParams]);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {loading ? (
                <div className='loading-screen'>
                    <div className='loading'></div>
                </div>
            ) : (
                <>
                    <div className="mx-auto max-w-screen-xl h-[40vh] md:h-[90vh] shadow-2xl">
                        <img
                            src={imgLink}
                            alt="Hero Image"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div className="mx-auto max-w-screen-xl px-4 pb-4">
                        <h1 className="text-center text-2xl md:text-3xl font-bold mt-4">Movies</h1>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                            {data?.response?.map((movie, index) => (
                                <Cards
                                    key={index}
                                    poster={movie.poster}
                                    name={movie.name}
                                    year={movie.year}
                                    ID={movie.ID}

                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default House;
