import React from 'react';
import { Alert } from '@chakra-ui/react';

interface ErrorAlertProps {
  error: string | null;
  title?: string;
  mb?: number;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  title = 'Error al cargar datos',
  mb = 4,
}) => {
  if (!error) return null;

  return (
    <Alert.Root status="error" mb={mb}>
      <Alert.Indicator />
      <Alert.Title>{title}</Alert.Title>
      <Alert.Description>{error}</Alert.Description>
    </Alert.Root>
  );
};
