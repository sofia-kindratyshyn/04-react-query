import css from './MovieGrid.module.css'
import type Movie from "../../types/movie"

interface MovieGridProps{
    movies: Movie[],
    onSelect: (movie: Movie) => void
}

export default function MovieGrid({movies, onSelect}: MovieGridProps){

    return(
        <>
        <ul className={css.grid}>
            {movies.map((movie: Movie) => 
             <li key={movie.id} onClick={() => onSelect(movie)}>
                <div className={css.card}>
                    <img className={css.image}
                      src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                      loading="lazy"
                    />
                    <h2 className={css.title}>{movie.title}</h2>
                </div>
             </li>
            )}
        </ul>

        </>
    )
}