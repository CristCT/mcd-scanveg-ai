import React from 'react';
import { Card, Stat, Spinner, Box, HStack } from '@chakra-ui/react';

interface StatisticsCardProps {
  label: string;
  value?: string | number;
  helpText: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  label,
  value,
  helpText,
  loading = false,
  icon,
}) => {
  return (
    <Card.Root>
      <Card.Body p={6}>
        <Stat.Root>
          <HStack justify="space-between" align="start" mb={2}>
            <Stat.Label>{label}</Stat.Label>
            {icon && (
              <Box color="teal.400" fontSize="xl">
                {icon}
              </Box>
            )}
          </HStack>
          <Stat.ValueText fontSize="2xl" fontWeight="bold">
            {loading ? <Spinner size="sm" /> : value}
          </Stat.ValueText>
          <Stat.HelpText>{helpText}</Stat.HelpText>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
