import { useSearchParams } from 'next/navigation';
import './Cards.css';
import Link from 'next/link';

const Cards = (props) => {
  const searchParams = useSearchParams();
  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 mt-3">
      <Link href={`/movie?query=${props.ID}`}>
        <img src={props.poster} alt="Movie Poster" className="card__img w-full h-full object-cover" />
        <div className="card__footer flex justify-between items-center p-4 bg-gray-800 text-white">
          <span>{props.name}</span>
          <span>{props.year}</span>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
