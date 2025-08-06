import { Button } from '../../../shared/components';
import { Box, Flex, Icon, Text, Stack } from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onReset: () => void;
}

export const ErrorState = ({ error, onRetry, onReset }: ErrorStateProps) => {
  return (
    <Box
      w="full"
      maxW="md"
      mx="auto"
      bg="red.50"
      border="1px"
      borderColor="red.200"
      rounded="lg"
      p={6}
    >
      <Stack textAlign="center" direction="column">
        <Flex bg="red.100" rounded="full" justify="center">
          <Icon as={FiAlertCircle} color="red.600" />
        </Flex>

        <Box>
          <Text fontSize="lg" fontWeight="medium" color="red.900">
            Error al procesar la imagen
          </Text>
          <Text fontSize="sm" color="red.700" mt={2}>
            {error}
          </Text>
        </Box>

        <Stack w="full" direction="column">
          <Button variant="primary" size="md" onClick={onRetry} w="full">
            Intentar de nuevo
          </Button>
          <Button variant="outline" size="md" onClick={onReset} w="full">
            Seleccionar otra imagen
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
