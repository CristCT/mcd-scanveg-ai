import React from 'react';
import {
  VStack,
  Text,
  IconButton,
  ButtonGroup,
  Pagination,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationInfo } from '../types';

interface PaginationControlsProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  itemName?: string;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  pagination,
  onPageChange,
  itemName = 'elementos',
}) => {
  return (
    <VStack gap={3} mt={4}>
      <Text fontSize="sm" color="gray.600">
        Mostrando {(pagination.page - 1) * pagination.page_size + 1} -{' '}
        {Math.min(
          pagination.page * pagination.page_size,
          pagination.total_items
        )}{' '}
        de {pagination.total_items} {itemName}
      </Text>

      <Pagination.Root
        count={pagination.total_items}
        pageSize={pagination.page_size}
        page={pagination.page}
        onPageChange={details => onPageChange(details.page)}
      >
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <ChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={page => (
              <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </VStack>
  );
};
