import { useState } from 'react';

interface PaginationOptions {
  itemsPerPage?: number;
}

export interface PaginationResult {
  totalPages: number;
  itemsPerPage: number;
  totalItems?: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
  //setTotalItems: (totalItems: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  handleTotalItemsChange: (totalItems: number) => void;
  handleItemsPerPageChange: (itemsPerPage: number) => void;
}

export const usePagination = ({ 
  itemsPerPage: _itemsPerPage = 10
}: PaginationOptions): PaginationResult => {
  const [itemsPerPage, setItemsPerPage] = useState(_itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / itemsPerPage));

  const handlePageChange = (pageNumber: number) => {
    console.log(pageNumber + " " + totalPages)
    const validPageNumber = Math.max(1, Math.min(pageNumber, totalPages - 1));
    setCurrentPage(validPageNumber);
  };

  // const setTotalItems = (totalItems: number) => {
  //   setTotalPages(Math.ceil(totalItems / itemsPerPage));
  // };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setCurrentPage(1)
    setItemsPerPage(itemsPerPage);
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  };

  const handleTotalItemsChange = (totalItems: number) => {
    setTotalItems(totalItems)
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }


  return {
    totalPages,
    itemsPerPage,
    totalItems,
    currentPage,
    handlePageChange,
    // setTotalItems,
    handleTotalItemsChange,
    handleItemsPerPageChange,
    setItemsPerPage,
  };
};

export default usePagination;