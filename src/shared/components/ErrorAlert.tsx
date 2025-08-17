import React from 'react';
import { Alert } from '@chakra-ui/react';

/**
 * Props for the ErrorAlert component
 */
interface ErrorAlertProps {
  error: string | null;
  title?: string;
  mb?: number;
}

/**
 * Reusable error alert component for displaying error messages
 * @param props - ErrorAlert component props
 * @returns Error alert component or null if no error
 */
export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  title = 'Error loading data',
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
