"use client"
import SearchBar from "./SearchBar";
import Image from 'next/image';

const Full_Header = () => {

    const handleMovieSubmit = async (movieName, isWebSeries) => {

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
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black text-textPrimary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <a href="/" className="flex items-center space-x-2 group">
                            <Image 
                                src="/logo.png" 
                                alt="Logo" 
                                width={48}
                                height={48}
                                className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110" 
                            />
                            <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Dharavahik
                            </span>
                        </a>
                    </div>

                    {/* Search Bar Section */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <SearchBar />
                    </div>

                    {/* Right Section - Can be used for additional features */}
                    <div className="flex items-center space-x-4">
                        <button 
                            className="hidden sm:flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300 text-sm font-medium"
                            onClick={() => window.location.href = '/'}
                        >
                            Home
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Full_Header;
