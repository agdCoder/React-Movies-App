import type { Movie } from "../App";

type Props = {
  currentMovie: Movie;
  setCurrentMovie: (movie: Movie | null) => void;
};

const MovieDetails = ({ currentMovie, setCurrentMovie }: Props) => {
  return (
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
  );
};

export default MovieDetails;
