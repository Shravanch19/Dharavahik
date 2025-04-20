import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Cards = (props) => {
  const searchParams = useSearchParams();
  return (
    <div className="w-full max-w-full aspect-[2/3] relative rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl group">
      <Link href={`/movie?query=${props.ID}`} className="block h-full">
        <div className="relative h-full">
          <Image 
            src={props.poster} 
            alt={`${props.name} Poster`} 
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <div className="absolute top-4 right-4 bg-black/75 px-3 py-2 rounded-full flex items-center gap-2 text-white font-semibold -translate-y-2.5 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-yellow-400">⭐</span>
              <span>{props.rating || 'N/A'}</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold leading-tight m-0">{props.name}</h3>
              <div className="flex gap-4 text-sm opacity-80">
                <span className="inline-flex items-center">{props.year}</span>
                {props.genre && (
                  <span className="inline-flex items-center relative pl-4 before:content-['•'] before:absolute before:left-2">
                    {props.genre}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
