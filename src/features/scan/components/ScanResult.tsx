import { Box, VStack, Text, Flex, Icon } from '@chakra-ui/react';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { Button } from '../../../shared/components';
import type { ScanResultData } from '../types';

interface ScanResultProps {
  result: ScanResultData;
  onReset: () => void;
}

export const ScanResult = ({ result, onReset }: ScanResultProps) => {
  const isHealthy = result.prediction === 'healthy';

  const resultColor = isHealthy ? 'green.600' : 'red.600';
  const bgColor = isHealthy ? 'green.50' : 'red.50';
  const borderColor = isHealthy ? 'green.200' : 'red.200';
  const iconBgColor = isHealthy ? 'green.100' : 'red.100';

  return (
    <Box w="full" maxW="md" mx="auto">
      <Box
        bg={bgColor}
        border="1px"
        borderColor={borderColor}
        rounded="lg"
        p={6}
      >
        <VStack gap={4} textAlign="center">
          <Flex
            w="16"
            h="16"
            bg={iconBgColor}
            rounded="full"
            align="center"
            justify="center"
            mx="auto"
          >
            <Icon
              as={isHealthy ? FiCheckCircle : FiAlertTriangle}
              w="8"
              h="8"
              color={resultColor}
            />
          </Flex>

          <Box>
            <Text fontSize="2xl" fontWeight="bold" color={resultColor}>
              {isHealthy ? 'Planta Sana' : 'Planta Enferma'}
            </Text>

            {!isHealthy && result.disease && (
              <Text fontSize="lg" fontWeight="medium" color="gray.900" mt={2}>
                Enfermedad: {result.disease}
              </Text>
            )}

            <Text fontSize="sm" color="gray.600" mt={2}>
              Confianza: {(result.confidence * 100).toFixed(1)}%
            </Text>
          </Box>

          {result.details && (
            <Box textAlign="left" w="full">
              <Text fontWeight="medium" color="gray.900" mb={2}>
                Detalles:
              </Text>
              <Text fontSize="sm" color="gray.700">
                {result.details}
              </Text>
            </Box>
          )}

          <Text fontSize="xs" color="gray.500">
            Procesado: {new Date(result.processedAt).toLocaleString()}
          </Text>

          <Box pt={4} w="full">
            <Button variant="outline" size="md" onClick={onReset} w="full">
              Analizar otra imagen
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
