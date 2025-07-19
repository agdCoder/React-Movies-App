import { type FormEvent } from "react";

type Props = {
  setSearch: (query: string) => void;
  setCurrentPage: (page: number) => void;
};

function Search({ setSearch, setCurrentPage }: Props) {
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query: string = formData.get("query")?.toString() ?? "";
    setSearch(query);
    setCurrentPage(1);
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        name="query"
        /*value={search}
                onChange={(e) => setSearch(e.target.value)}*/
      />
      <button type="submit">Search</button>
      <button type="reset">Clear</button>
    </form>
  );
}

export default Search;
