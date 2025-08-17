import React from 'react';
import {
  Card,
  Heading,
  VStack,
  HStack,
  Text,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ErrorAlert } from '../../../shared/components';
import type { WeeklyAnalysisItem } from '../../../shared/types';
import { BarList, type BarListData, useChart } from '@chakra-ui/charts';

interface WeeklyAnalysisCardProps {
  title: string;
  weeklyData: WeeklyAnalysisItem[];
  formatDayName: (day: number | undefined | null) => string;
  loading?: boolean;
  error?: string | null;
  currentPage?: number;
  onPageChange?: (direction: 'prev' | 'next') => void;
  startDate?: string;
  endDate?: string;
}

export const WeeklyAnalysisCard: React.FC<WeeklyAnalysisCardProps> = ({
  title,
  weeklyData,
  formatDayName,
  loading = false,
  error = null,
  onPageChange,
  startDate = '',
  endDate = '',
}) => {
  const nf = new Intl.NumberFormat();

  const data = React.useMemo<BarListData[]>(
    () =>
      weeklyData.map(d => ({
        name: formatDayName(d.day),
        value: d.count,
      })),
    [weeklyData, formatDayName]
  );

  const chart = useChart<BarListData>({
    data,
    series: [{ name: 'name', color: 'teal.subtle' }],
  });

  return (
    <Card.Root>
      <Card.Header px={6} pt={6} pb={0}>
        <Heading size="md">{title}</Heading>
      </Card.Header>
      <Card.Body p={6}>
        <ErrorAlert error={error} />

        {loading ? (
          <VStack justify="center" align="center" h="200px">
            <Spinner size="lg" />
            <Text>Cargando análisis semanales...</Text>
          </VStack>
        ) : data.length === 0 && !error ? (
          <VStack justify="center" align="center" h="200px">
            <Text color="gray.500">
              No hay datos de análisis semanales disponibles para este período
            </Text>
          </VStack>
        ) : data.length > 0 ? (
          <VStack gap={4}>
            <BarList.Root chart={chart} w="full">
              <BarList.Content columnGap={4}>
                <BarList.Bar rounded="full" />

                <BarList.Value valueFormatter={v => nf.format(v)} />
              </BarList.Content>
            </BarList.Root>

            {onPageChange && (
              <HStack justify="space-between" align="center" w="full">
                <HStack>
                  <IconButton
                    size="lg"
                    variant={{ base: 'ghost', _selected: 'outline' }}
                    onClick={() => onPageChange('prev')}
                  >
                    <ChevronLeft />
                  </IconButton>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  {startDate && endDate ? `${startDate} - ${endDate}` : ''}
                </Text>

                <HStack>
                  <IconButton
                    size="lg"
                    variant={{ base: 'ghost', _selected: 'outline' }}
                    onClick={() => onPageChange('next')}
                  >
                    <ChevronRight />
                  </IconButton>
                </HStack>
              </HStack>
            )}
          </VStack>
        ) : (
          <VStack justify="center" align="center" h="200px">
            <Text color="gray.500">
              No hay datos de análisis semanales disponibles para este período
            </Text>
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
};
