import React from 'react';
import {
  Card,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { ErrorAlert } from '../../../shared/components';
import type { DailyAnalysisItem } from '../../../shared/types';

const getValidProgressValue = (value: number): number => {
  return isNaN(value) || !isFinite(value)
    ? 0
    : Math.min(Math.max(value, 0), 100);
};

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
  const maxValue = Math.max(...dailyData.map(d => d.count), 1);

  return (
    <Card.Root>
      <Card.Header p={6}>
        <Heading size="md">{title}</Heading>
      </Card.Header>
      <Card.Body p={6}>
        <ErrorAlert error={error} />

        {loading ? (
          <VStack justify="center" align="center" h="200px">
            <Spinner size="lg" />
            <Text>Cargando análisis diarios...</Text>
          </VStack>
        ) : dailyData.length === 0 ? (
          <VStack justify="center" align="center" h="200px">
            <Text color="gray.500">
              No hay datos de análisis diarios disponibles
            </Text>
          </VStack>
        ) : (
          <VStack gap={3} align="stretch">
            {dailyData.map((item, index) => (
              <HStack key={index} align="center" gap={3}>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  w="40px"
                  color="gray.700"
                >
                  {formatDayName(item.day)}
                </Text>
                <Box flex="1" mx={3}>
                  <Progress.Root
                    value={getValidProgressValue((item.count / maxValue) * 100)}
                    colorPalette="blue"
                    size="lg"
                    borderRadius="full"
                    striped
                    animated
                  >
                    <Progress.Track bg="blue.50">
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                </Box>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  w="35px"
                  textAlign="right"
                  color="blue.600"
                >
                  {item.count}
                </Text>
              </HStack>
            ))}
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
};
