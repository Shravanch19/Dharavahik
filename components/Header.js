import Image from "next/image"
import SearchBar from "./SearchBar"
import hero from '../public/assets/hero.jpg'
const Header = () => {
    return (
        <section className='Hero-Section relative border-b border-white'>

            {/* Navbar */}
            <div className='Nav bg-background text-textPrimary flex justify-between items-center w-[80vw] h-18 p-2 absolute top-4 left-[10vw] rounded-xl border border-highlight '>
                <div className='logo'>
                    <a href="/">
                        <h1 className='text-3xl font-bold ml-3'>Dharavahik</h1>
                    </a>
                </div>
                <SearchBar />
            </div>

            {/* Hero Image */}
            <div className="Hero-Image w-[100%] h-[100%]">
                <Image src={hero} alt="Hero Image" layout="cover" width={1920} height={1080} />
            </div>

            {/* Hero Text */}
            <section className='hero-text absolute top-[95vh] left-[40vw] text-5xl font-bold text-textPrimary '>
                <h2 className='text-3xl'>All Your Fantasies Here</h2>
            </section>


        </section>
    )
}

export default Header