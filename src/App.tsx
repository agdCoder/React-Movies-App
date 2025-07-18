import { useCallback, useEffect, useState, type FormEvent } from "react";
import "./App.css";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

type Movie = {
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
    console.log(data);
    setMovies(data.results);
    setCurrentPage(data.page);
    setTotalPages(data.total_pages);
  }, [currentPage, search]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  /*useEffect(() => {
    if (currentMovie) alert(currentMovie);
  }, [currentMovie]);*/

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query: string = formData.get("query")?.toString() ?? "";
    setSearch(query);
    setCurrentPage(1);
  }

  function handlePagination(newCurrentPage: number) {
    setCurrentPage(newCurrentPage);
  }

  function handleViewDetail(newCurrentMovie: Movie) {
    setCurrentMovie(newCurrentMovie);
  }

  return (
    <>
      {currentMovie ? (
        <div>
          <h1>{currentMovie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
            alt={currentMovie.title}
          />
          {/*<img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: '/no-movie.png'} alt={title} />*/}
          <dl>
            <dt>ID</dt>
            <dd>{currentMovie.id}</dd>
            <dt>Adults</dt>
            <dd>{currentMovie.adult}</dd>
            <dt>Genre</dt>
            <dd>{currentMovie.genre_ids}</dd>
            <dt>Original Language</dt>
            <dd>{currentMovie.original_language}</dd>
            <dt>Original Title</dt>
            <dd>{currentMovie.original_title}</dd>
            <dt>Popularity</dt>
            <dd>{currentMovie.popularity}</dd>
            <dt>Backdrop</dt>
            <dd>{currentMovie.backdrop_path}</dd>
            <dt>Poster</dt>
            <dd>{currentMovie.poster_path}</dd>
            <dt>Release Date</dt>
            <dd>{currentMovie.adult}</dd>
            <dt>Video</dt>
            <dd>{currentMovie.video}</dd>
            <dt>Vote Average</dt>
            <dd>{currentMovie.vote_average}</dd>
            <dt>Vote Count</dt>
            <dd>{currentMovie.vote_count}</dd>
            <dt>Overview</dt>
            <dd>{currentMovie.overview}</dd>
          </dl>
          <button onClick={() => setCurrentMovie(null)}>Home</button>
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentMovie.backdrop_path}`}
            alt={currentMovie.title}
          />
        </div>
      ) : (
        <div>
          <header>
            <h1>Movies</h1>
            <form onSubmit={handleSearch}>
              <input
                name="query"
                /*value={search}
                onChange={(e) => setSearch(e.target.value)}*/
              />
              <button type="submit">Search</button>
              <button type="reset">Clear</button>
            </form>
          </header>
          <main>
            <table>
              <caption>Movies results:</caption>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Release</th>
                  <th>Rating</th>
                  <th>View Detail</th>
                </tr>
              </thead>
              <tbody>
                {movies &&
                  movies.map((movie) => (
                    <tr key={movie.id}>
                      <td>{movie.id}</td>
                      <td>{movie.title}</td>
                      <td>{movie.release_date}</td>
                      <td>{movie.vote_average}</td>
                      <td>
                        <button onClick={() => handleViewDetail(movie)}>
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/*movies && movies.map((movie) => <p key={movie.id}>{movie.title}</p>)*/}
            <div>
              <button
                disabled={currentPage <= 1}
                onClick={() => handlePagination(currentPage - 1)}
              >
                prev
              </button>
              <span>
                {currentPage} / {search ? totalPages : "..."}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => handlePagination(currentPage + 1)}
              >
                next
              </button>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
