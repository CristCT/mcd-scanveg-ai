import { Button } from '../../../shared/components';
import { Box, Flex, Icon, Text, Stack, Card } from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onReset: () => void;
}

export const ErrorState = ({ error, onRetry, onReset }: ErrorStateProps) => {
  return (
    <Box w="full" border="1px" borderColor="red.200" rounded="lg" p={16}>
      <Stack textAlign="center" direction="column">
        <Card.Root width="320px" bg="white">
          <Card.Body gap="2" textAlign="center" padding={26}>
            <Flex bg="red.100" rounded="full" justify="center">
              <Icon as={FiAlertCircle} color="red.600" />
            </Flex>
            <Text fontSize="lg" fontWeight="medium" color="red.900">
              Error al procesar la imagen
            </Text>
            <Text fontSize="sm" color="red.700" mt={2}>
              {error}
            </Text>
            <Stack w="full" direction="column">
              <Button variant="primary" size="md" onClick={onRetry} w="full">
                Intentar de nuevo
              </Button>
              <Button variant="outline" size="md" onClick={onReset} w="full">
                Seleccionar otra imagen
              </Button>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
};
