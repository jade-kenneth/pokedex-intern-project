import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useBattleState from "src/hooks/useBattleState";

interface PaginationProps {
  totalPokemon: number;

  paginate: (number: number) => void;
  currentPage: number;
  handlePrev?: () => void;
  handleNext?: () => void;
  pageNumbers: number[];
  numberPerPage: number;
  handleFetchMore: () => void;
  isFilter: boolean;
  currentShownData: any[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,

  pageNumbers,
  numberPerPage,
  paginate,
  currentShownData,
  handleFetchMore,
  isFilter,
  totalPokemon,
}) => {
  const [initial, setInitial] = useState(0);
  const [final, setFinal] = useState(numberPerPage);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    paginate(initial + 1);
  }, [toggle]);

  const handleNextPagination = () => {
    /** trigger only if it is end of the page and
     * filter feature is disabled
     */
    if (final === pageNumbers.length && !isFilter) {
      handleFetchMore();
      setToggle((prev) => !prev);
      setInitial((prev) => prev + numberPerPage);
      setFinal((prev) => prev + numberPerPage);

      /** if current page  */
    } else if (final < pageNumbers.length) {
      setToggle((prev) => !prev);
      setInitial((prev) => prev + numberPerPage);
      setFinal((prev) => prev + numberPerPage);
    }
  };

  return (
    <VStack justify={"space-between"} width={"100%"}>
      <HStack justify="flex-end" mt="1rem" width={"100%"}>
        <Text fontSize="0.875rem">
          Showing{" "}
          {currentPage
            ? currentPage * numberPerPage - (numberPerPage - 1)
            : initial + 1 * currentShownData.length - (numberPerPage - 1)}
          -
          {currentPage * numberPerPage -
            (numberPerPage - currentShownData.length)}{" "}
          of {totalPokemon}{" "}
        </Text>
      </HStack>
      <HStack w="auto" align={"center"} spacing="10px" height="2rem">
        <IconButton
          w="0.3rem"
          h="0.5rem"
          bg="transparent"
          icon={<MdKeyboardArrowLeft />}
          aria-label="prev button"
          onClick={() => {
            if (currentPage - numberPerPage > 0) {
              setToggle((prev) => !prev);
              setInitial((prev) => prev - numberPerPage);
              setFinal((prev) => prev - numberPerPage);
            }
          }}
        />

        {pageNumbers.slice(initial, final).map((page) => {
          return (
            <>
              <Center
                width={"2rem"}
                height={"100%"}
                borderRadius={"sm"}
                color="black"
                background={page === currentPage ? "primary" : "gray.300"}
                onClick={() => paginate(page)}
                cursor="pointer"
              >
                {page}
              </Center>
            </>
          );
        })}
        {/* initial = 0 + 5 = 5
        final = 5 - 5
      */}
        <IconButton
          w="0.3rem"
          h="0.5rem"
          bg="transparent"
          icon={<MdKeyboardArrowRight />}
          aria-label="prev button"
          onClick={() => handleNextPagination()}
        />
      </HStack>
    </VStack>
  );
};

export default Pagination;
