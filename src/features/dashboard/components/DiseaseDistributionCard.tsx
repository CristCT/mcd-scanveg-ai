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
import type { DiseaseDistribution } from '../../../shared/types';

const getValidProgressValue = (value: number): number => {
  return isNaN(value) || !isFinite(value)
    ? 0
    : Math.min(Math.max(value, 0), 100);
};

interface DiseaseDistributionCardProps {
  title: string;
  diseases: DiseaseDistribution[];
  formatDiseaseName: (name: string | undefined | null) => string;
  loading?: boolean;
  error?: string | null;
}

export const DiseaseDistributionCard: React.FC<
  DiseaseDistributionCardProps
> = ({ title, diseases, formatDiseaseName, loading = false, error = null }) => {
  const maxValue = Math.max(...diseases.map(d => d.count), 1);

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
            <Text>Cargando distribución de enfermedades...</Text>
          </VStack>
        ) : diseases.length === 0 ? (
          <VStack justify="center" align="center" h="200px">
            <Text color="gray.500">
              No hay datos de enfermedades disponibles
            </Text>
          </VStack>
        ) : (
          <VStack gap={4} align="stretch">
            {diseases.map((disease, index) => (
              <Box key={index}>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">
                    {formatDiseaseName(disease.name)}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="gray.600">
                    {disease.count}
                  </Text>
                </HStack>
                <Progress.Root
                  value={getValidProgressValue(
                    (disease.count / maxValue) * 100
                  )}
                  colorPalette={disease.color.split('.')[0]}
                  size="md"
                  borderRadius="md"
                  striped
                  animated
                >
                  <Progress.Track bg="gray.100">
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              </Box>
            ))}
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
};
