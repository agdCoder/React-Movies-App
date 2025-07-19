import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import MoviesTable from "./components/MoviesTable";
import MovieDetails from "./components/MovieDetails";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  video: boolean;
  vote_count: number;
};

type RawResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>();

  const fetchMovies = useCallback(async () => {
    const endpoint = search
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
          search
        )}&page=${currentPage}`
      : `${API_BASE_URL}/discover/movie?page=${currentPage}&sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = (await response.json()) as RawResults;
    //console.log(data);
    setMovies(data.results);
    setCurrentPage(data.page);
    setTotalPages(data.total_pages);
  }, [search, currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      {currentMovie ? (
        <MovieDetails
          currentMovie={currentMovie}
          setCurrentMovie={setCurrentMovie}
        />
      ) : (
        <div>
          <header>
            <h1>Movies</h1>
            <Search setSearch={setSearch} setCurrentPage={setCurrentPage} />
          </header>
          <main>
            <MoviesTable movies={movies} setCurrentMovie={setCurrentMovie} />
            <Pagination
              isSearching={!!search}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
