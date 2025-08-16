import React from 'react';
import { Box, Text, Spinner } from '@chakra-ui/react';
import { useServerStatus } from '../hooks/useServerStatus';

interface ServerStatusProps {
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const ServerStatus: React.FC<ServerStatusProps> = () => {
  const { isOnline, isLoading } = useServerStatus();

  const getStatusColor = () => {
    if (isLoading) return 'gray.500';
    return isOnline ? 'green.500' : 'red.500';
  };

  const getStatusText = () => {
    if (isLoading) return 'Verificando...';
    return isOnline ? 'Online' : 'Offline';
  };

  return (
    <Box
      px={3}
      py={1}
      bg={isOnline ? 'green.50' : 'red.50'}
      border="1px"
      borderColor={isOnline ? 'green.200' : 'red.200'}
      rounded="md"
      display="flex"
      alignItems="center"
      gap={2}
    >
      {isLoading ? (
        <Spinner size="xs" />
      ) : (
        <Box w={2} h={2} borderRadius="full" bg={getStatusColor()} />
      )}
      <Text fontSize="sm" fontWeight="medium" color={getStatusColor()}>
        {getStatusText()}
      </Text>
    </Box>
  );
};

export { ServerStatus };
