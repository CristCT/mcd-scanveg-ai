import { useState, useCallback } from 'react';
import type { PaginationInfo } from '../types';

export interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  pagination: PaginationInfo | undefined;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setPagination: (pagination: PaginationInfo | undefined) => void;
  resetPagination: () => void;
}

export const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationOptions = {}): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pagination, setPagination] = useState<PaginationInfo | undefined>(
    undefined
  );

  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(initialPageSize);
    setPagination(undefined);
  }, [initialPage, initialPageSize]);

  return {
    currentPage,
    pageSize,
    pagination,
    setCurrentPage,
    setPageSize,
    setPagination,
    resetPagination,
  };
};
