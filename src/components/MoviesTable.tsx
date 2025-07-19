import type { Movie } from "../App";

type Props = {
  movies: Movie[] | undefined;
  setCurrentMovie: (movie: Movie) => void;
};

const MoviesTable = ({ movies, setCurrentMovie }: Props) => {
  return (
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
                <button onClick={() => setCurrentMovie(movie)}>Detail</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
