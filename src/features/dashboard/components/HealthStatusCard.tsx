import React from 'react';
import { Card, Heading, VStack, Text, Spinner } from '@chakra-ui/react';
import { Chart, useChart } from '@chakra-ui/charts';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { ErrorAlert } from '../../../shared/components';

interface HealthStatusCardProps {
  title: string;
  healthyPercentage: number;
  loading?: boolean;
  hasData?: boolean;
  error?: string | null;
}

export const HealthStatusCard: React.FC<HealthStatusCardProps> = ({
  title,
  healthyPercentage,
  loading = false,
  hasData = true,
  error = null,
}) => {
  const diseasedPercentage = 100 - healthyPercentage;

  const chart = useChart({
    data: [
      {
        name: 'Saludables',
        value: healthyPercentage,
        color: 'green.solid',
      },
      {
        name: 'Enfermas',
        value: diseasedPercentage,
        color: 'red.solid',
      },
    ],
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
            <Text>Cargando datos...</Text>
          </VStack>
        ) : !hasData ? (
          <VStack justify="center" align="center" h="200px">
            <Text color="gray.500">No hay datos disponibles</Text>
          </VStack>
        ) : (
          <VStack align="center" gap={4}>
            <Chart.Root boxSize="200px" mx="auto" chart={chart}>
              <PieChart>
                <Tooltip
                  cursor={false}
                  animationDuration={400}
                  content={<Chart.Tooltip hideLabel />}
                />
                <Pie
                  isAnimationActive={true}
                  data={chart.data}
                  dataKey={chart.key('value')}
                  outerRadius={80}
                  innerRadius={40}
                  labelLine={false}
                >
                  {chart.data.map(item => {
                    return (
                      <Cell
                        key={item.name}
                        strokeWidth={6}
                        fill={chart.color(item.color)}
                      />
                    );
                  })}
                </Pie>
              </PieChart>
            </Chart.Root>
            <VStack gap={2}>
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                {healthyPercentage.toFixed(1)}% Saludables
              </Text>
              <Text fontSize="sm" color="gray.600">
                {diseasedPercentage.toFixed(1)}% con enfermedades
              </Text>
            </VStack>
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
};
