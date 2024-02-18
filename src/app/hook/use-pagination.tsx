import { useState } from 'react';

interface PaginationOptions {
  totalItems: number;
  itemsPerPage: number;
}

interface PaginationResult {
  currentPage: number;
  totalPages: number;
  goToPage: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const usePagination = ({ totalItems, itemsPerPage }: PaginationOptions): PaginationResult => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (pageNumber: number) => {
    const validPageNumber = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(validPageNumber);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  };
};

export default usePagination;