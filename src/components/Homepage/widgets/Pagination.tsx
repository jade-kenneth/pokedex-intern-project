import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

interface PaginationProps {
  numberPerPage?: number;
  totalPokemon?: number | undefined;
  setShowLoadMore?: React.Dispatch<React.SetStateAction<boolean>>;
  paginate: (number: number) => void;
  currentPage: number;
  handlePrev: () => void;
  handleNext: () => void;
  pageNumbers: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  handlePrev,
  currentPage,
  handleNext,
  pageNumbers,
  paginate,
}) => {
  return (
    <HStack w="auto" spacing="10px" height="2rem">
      {pageNumbers.map((page) => {
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
    </HStack>
  );
};

export default Pagination;
