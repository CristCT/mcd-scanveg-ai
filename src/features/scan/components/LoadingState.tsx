import { Box, VStack, Text, Flex } from '@chakra-ui/react';

export const LoadingState = () => {
  return (
    <Box w="full" maxW="md" mx="auto">
      <Box bg="white" rounded="lg" shadow="md" p={8}>
        <VStack gap={4} textAlign="center">
          <Box mx="auto" w="16" h="16" position="relative">
            <Box
              position="absolute"
              inset="0"
              border="4px"
              borderColor="gray.200"
              rounded="full"
            />
            <Box
              position="absolute"
              inset="0"
              border="4px"
              borderColor="primary.600"
              rounded="full"
              borderTopColor="transparent"
              className="animate-spin"
            />
          </Box>

          <Box>
            <Text fontSize="lg" fontWeight="medium" color="gray.900">
              Analizando imagen...
            </Text>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Esto puede tomar unos segundos
            </Text>
          </Box>

          <Flex justify="center" gap={1}>
            <Box
              w="2"
              h="2"
              bg="primary.600"
              rounded="full"
              className="animate-pulse"
            />
            <Box
              w="2"
              h="2"
              bg="primary.600"
              rounded="full"
              className="animate-pulse"
              style={{ animationDelay: '0.1s' }}
            />
            <Box
              w="2"
              h="2"
              bg="primary.600"
              rounded="full"
              className="animate-pulse"
              style={{ animationDelay: '0.2s' }}
            />
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};
