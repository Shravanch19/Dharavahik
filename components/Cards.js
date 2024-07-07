import { LiaImdb } from "react-icons/lia";
import {useSearchParams} from 'next/navigation'

const Cards = (props) => {
  const searchParams = useSearchParams();
  console.log(searchParams)
  return (
    <div className='card flex flex-col h-[55vh] w-[17vw] relative bg-amber-200 border border-black'>
      <a href={`/movie?query=${props.name}`}>
        <img src={props.poster} alt="Movie Poster" className="card-img  h-[90%] object-contain mt-2" />
        <p className='text-center' >{props.name}</p>
        <div className="IMdb_Rating absolute top-1 right-1 h-11 w-11 bg-blue-200 flex flex-col items-center">
          <LiaImdb className="h-6 w-6" />
          <p>{props.IMDB_Rating}</p>
        </div>
      </a>
    </div>
  )
}

export default Cards