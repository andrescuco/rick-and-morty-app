import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { Character } from "./types";
import axios from "axios";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [isFinalPage, setIsFinalPage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevState) => (prevState === 1 ? 1 : prevState - 1));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;

    if (!characters.length) return;
    if (!searchQuery.length) setFilteredCharacters([]);

    setFilteredCharacters(() =>
      characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery)
      )
    );
  };

  const getCharacters = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://rickandmortyapi.com/api/character",
        {
          params: { page }
        }
      );

      if (data.info.next === null) {
        setIsFinalPage(true);
      } else {
        setIsFinalPage(false);
      }

      setCharacters(data.results);
      setFilteredCharacters(data.results);
    } catch (error) {
      setErrorMessage("An error has occurred, please try again.");
    }
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    getCharacters();
    // Simulate a loading api state
    setTimeout(() => {
      setIsLoading(false);
    }, 150);
  }, [getCharacters]);

  return {
    characters: filteredCharacters.length > 0 ? filteredCharacters : characters,
    isFinalPage,
    errorMessage,
    isLoading,
    page,
    handleNextPage,
    handlePreviousPage,
    handleSearch
  };
};
