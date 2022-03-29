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
  totalPokemon?: number | undefined;

  paginate: (number: number) => void;
  currentPage: number;
  handlePrev: () => void;
  handleNext: () => void;
  pageNumbers: number[];
  numberPerPage: number;
  handleFetchMore: () => void;
  isFilter: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  handlePrev,
  currentPage,
  handleNext,
  pageNumbers,
  numberPerPage,
  paginate,

  handleFetchMore,
  isFilter,
}) => {
  const [initial, setInitial] = useState(0);
  const [final, setFinal] = useState(numberPerPage);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    paginate(initial + 1);
  }, [toggle]);
  const battleState = useBattleState((state) => state);
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
          Showing {currentPage ? currentPage : initial + 1}-
          {/** if page less than final (idx)
           *   set the page length as final page indicator
           *
           */}
          {pageNumbers.length < final ? pageNumbers.length : final} of{" "}
          {pageNumbers.length}{" "}
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
