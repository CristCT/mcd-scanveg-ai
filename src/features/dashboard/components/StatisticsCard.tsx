import React from 'react';
import { Card, Stat, Spinner } from '@chakra-ui/react';

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
          <Stat.Label>{label}</Stat.Label>
          <Stat.ValueText>
            {loading ? <Spinner size="sm" /> : value}
          </Stat.ValueText>
          <Stat.HelpText>
            {icon && <Stat.UpIndicator />}
            {helpText}
          </Stat.HelpText>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};
