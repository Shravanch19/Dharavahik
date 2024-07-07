import SearchBar from "./SearchBar";
const Full_Header = () => {
    return (
        <div className='Nav bg-background text-textPrimary flex justify-between items-center w-[100vw] h-[10vh] border-b border-highlight '>
            <div className='logo'>
                <a href="/">
                    <h1 className='text-3xl font-bold ml-3'>Dharavahik</h1>
                </a>
            </div>
            <button className="border border-highlight p-2 rounded-lg bg-yellow-200 text-black shadow-sm shadow-blue-300"> Get Using A.I. </button>
            <SearchBar />
        </div>
    )
}

export default Full_Header