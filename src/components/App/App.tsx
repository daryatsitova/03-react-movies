import { useState } from 'react'
import css from './App.module.css'
import type { Movie } from '../../../types/movie'
import toast, { Toaster } from 'react-hot-toast'

import SearchBar from '../SearchBar/SearchBar'
import { fetchMovies } from '../../services/movieService'
import MovieGrid from '../MovieGrid/MovieGrid'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import Loader from '../Loader/Loader'

export default function App() {
const [movies, setMovies] = useState<Movie[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const closeMovieModal = () => {
    setSelectedMovie(null);
  }

    const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);

      const data = (await fetchMovies(query)) as Movie[];

      if (data.length === 0) {
        toast.error('No movies found for your request.');
      }

      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
    };
  
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <div className={css.app}>
        <Toaster />
        <SearchBar onSubmit={handleSearch} />
        {isError ? (<ErrorMessage />) : (movies.length > 0 && (<MovieGrid onSelect={handleSelectMovie} movies={movies} />))}
        {isLoading && <Loader />}
        {selectedMovie && (<MovieModal onClose={closeMovieModal}
          movie={selectedMovie} />)}
      </div>
    </>
  );
}

