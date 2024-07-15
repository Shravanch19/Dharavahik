import { LiaImdb } from "react-icons/lia";
import { useSearchParams } from 'next/navigation';

const Cards = (props) => {
  const searchParams = useSearchParams();
  console.log(searchParams);
  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <a href={`/movie?query=${props.ID}`}>
        <img src={props.poster} alt="Movie Poster" className="card__img w-full h-68 object-cover" />
        <div className="card__footer flex justify-between items-center p-4 bg-gray-800 text-white">
          <span>{props.name}</span>
          <span>{props.year}</span>
        </div>
        <div className="card__action absolute top-1 right-1 h-11 w-11 bg-blue-200 flex flex-col items-center justify-center rounded-full">
          <LiaImdb className="h-6 w-6 text-black" />
          <p className="text-black">{props.IMDB_Rating}</p>
        </div>
      </a>
    </div>
  );
};

export default Cards;
