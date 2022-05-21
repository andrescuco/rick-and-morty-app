// https://codesandbox.io/s/pvt4j?file=/index.html
import { Character } from "./types";
import { useCharacters } from "./useCharacters";
import CharacterCard from "./CharacterCard";
import "./styles.css";

export default function App() {
  const {
    characters,
    isLoading,
    errorMessage,
    isFinalPage,
    page,
    handlePreviousPage,
    handleNextPage,
    handleSearch
  } = useCharacters();

  if (isLoading) return <h1>loading...</h1>;
  if (errorMessage) return <h1>{errorMessage}</h1>;

  return (
    <div className="App">
      <div className="pagination-buttons-container">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={isFinalPage}>
          Next
        </button>
        <span>Page: {page}</span>
      </div>
      <div className="search-container">
        <input onChange={handleSearch} type="text" placeholder="Search" />
      </div>
      <div className="character-list-container">
        {characters.map((character: Character) => {
          return (
            <CharacterCard
              key={character.id}
              image={character.image}
              name={character.name}
              status={character.status}
              species={character.species}
              location={character.location}
            />
          );
        })}
      </div>
    </div>
  );
}
