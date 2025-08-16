import React from 'react';
import { Card, Heading, VStack, Text, Spinner } from '@chakra-ui/react';
import { ErrorAlert } from '../../../shared/components';
import type { DailyAnalysisItem } from '../../../shared/types';
import { BarList, type BarListData, useChart } from '@chakra-ui/charts';

interface DailyAnalysisCardProps {
  title: string;
  dailyData: DailyAnalysisItem[];
  formatDayName: (day: number | undefined | null) => string;
  loading?: boolean;
  error?: string | null;
}

export const DailyAnalysisCard: React.FC<DailyAnalysisCardProps> = ({
  title,
  dailyData,
  formatDayName,
  loading = false,
  error = null,
}) => {
  const nf = new Intl.NumberFormat();

  const data = React.useMemo<BarListData[]>(
    () =>
      dailyData.map(d => ({
        name: formatDayName(d.day),
        value: d.count,
      })),
    [dailyData, formatDayName]
  );

  const chart = useChart<BarListData>({
    data,
    sort: { by: 'name', direction: 'asc' },
    series: [{ name: 'name', color: 'blue.subtle' }],
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
            <Text>Cargando análisis diarios...</Text>
          </VStack>
        ) : data.length === 0 ? (
          <VStack justify="center" align="center" h="200px">
            <Text color="gray.500">
              No hay datos de análisis diarios disponibles
            </Text>
          </VStack>
        ) : (
          <BarList.Root chart={chart}>
            <BarList.Content>
              <BarList.Bar rounded="full" />
              <BarList.Value valueFormatter={v => nf.format(v)} />
            </BarList.Content>
          </BarList.Root>
        )}
      </Card.Body>
    </Card.Root>
  );
};
