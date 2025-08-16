import React from 'react';
import {
  Card,
  Heading,
  VStack,
  Text,
  Progress,
  Spinner,
  Table,
  Badge,
} from '@chakra-ui/react';
import { ErrorAlert, PaginationControls } from '../../../shared/components';
import type { AnalysisResult, PaginationInfo } from '../../../shared/types';

const getValidProgressValue = (value: number): number => {
  return isNaN(value) || !isFinite(value)
    ? 0
    : Math.min(Math.max(value, 0), 100);
};

interface RecentAnalysesCardProps {
  title: string;
  analyses: AnalysisResult[];
  formatDiseaseName: (name: string | undefined | null) => string;
  translateStatus: (status: string) => string;
  getConfianzaColor: (confidence: number) => string;
  formatAnalysisDate: (dateString: string) => string;
  loading?: boolean;
  error?: string | null;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
}

export const RecentAnalysesCard: React.FC<RecentAnalysesCardProps> = ({
  title,
  analyses,
  formatDiseaseName,
  translateStatus,
  getConfianzaColor,
  formatAnalysisDate,
  loading = false,
  error = null,
  pagination,
  onPageChange,
}) => {
  const getEstadoBadge = (estado: string) => {
    return (
      <Badge
        colorPalette={estado === 'healthy' ? 'green' : 'red'}
        variant="subtle"
        px={2}
      >
        {translateStatus(estado)}
      </Badge>
    );
  };

  return (
    <Card.Root>
      <Card.Header px={6} pt={6} pb={0}>
        <Heading size="md">{title}</Heading>
      </Card.Header>
      <Card.Body p={6}>
        <ErrorAlert error={error} title="Error al cargar análisis" />

        {loading ? (
          <VStack justify="center" align="center" h="200px">
            <Spinner size="lg" />
            <Text>Cargando análisis recientes...</Text>
          </VStack>
        ) : analyses.length === 0 ? (
          <VStack justify="center" align="center" h="200px">
            <Text color="gray.500">No hay análisis recientes disponibles</Text>
          </VStack>
        ) : (
          <Table.ScrollArea>
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader p={2}>ID</Table.ColumnHeader>
                  <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                  <Table.ColumnHeader>Enfermedad</Table.ColumnHeader>
                  <Table.ColumnHeader>Confianza</Table.ColumnHeader>
                  <Table.ColumnHeader>Estado</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {analyses.map(item => (
                  <Table.Row key={item.id}>
                    <Table.Cell p={2} fontWeight="medium">
                      #{item.id}
                    </Table.Cell>
                    <Table.Cell>{formatAnalysisDate(item.date)}</Table.Cell>
                    <Table.Cell>
                      <Text fontWeight="medium">
                        {formatDiseaseName(item.disease)}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <VStack align="start" gap={2}>
                        <Text fontWeight="medium">
                          {item.confidence.toFixed(1)}%
                        </Text>
                        <Progress.Root
                          value={getValidProgressValue(item.confidence)}
                          size="sm"
                          colorPalette={getConfianzaColor(item.confidence)}
                          w="60px"
                        >
                          <Progress.Track>
                            <Progress.Range />
                          </Progress.Track>
                        </Progress.Root>
                      </VStack>
                    </Table.Cell>
                    <Table.Cell>{getEstadoBadge(item.status)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        )}

        {pagination && onPageChange && (
          <PaginationControls
            pagination={pagination}
            onPageChange={onPageChange}
            itemName="análisis"
          />
        )}
      </Card.Body>
    </Card.Root>
  );
};
