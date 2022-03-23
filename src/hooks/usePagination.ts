import React, { useState } from "react";
import { GetAllPokemons } from "src/types/pokemon/GetAllPokemons";

export const usePagination = (
  numberPerPage: number,
  { pokemons }: GetAllPokemons
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * numberPerPage;
  const indexOfFirst = indexOfLast - numberPerPage;
  // const paginate = useCallback((number) => {
  //   setCurrentPage(number);
  // }, []);
  let pageNumbers: number[] = [];

  const totalNumberOfPage = Math.ceil(100 / numberPerPage);

  for (let i = 0; i < totalNumberOfPage; i++) {
    pageNumbers.push(i + 1);
  }

  const data = () => {
    const data = pokemons.slice(indexOfFirst, indexOfLast);
    return data;
  };
  const paginate = (number: number) => {
    setCurrentPage(number);
  };
  const handleNext = () => {
    if (currentPage <= pageNumbers[totalNumberOfPage - 1]) {
      setCurrentPage((prev) => prev + 1);
      // paginate(currentPage);
      //show load if current page equal to last page
      // if (currentPage === pageNumbers[pageNumbers.length - 1]) {
      //   setShowLoadMore((prev) => (prev = true));
      // }
    }
  };
  const handlePrev = () => {
    if (currentPage > pageNumbers[0]) {
      setCurrentPage((prev) => prev - 1);
      // paginate(currentPage);
      // setShowLoadMore((prev) => (prev = false));
    }
  };

  return {
    pageNumbers,
    data,
    handleNext,
    handlePrev,
    paginate,
    currentPage,
  };
};
