import { useState, useEffect } from 'react';
import { Box, Flex, VStack, Text, Image, AspectRatio } from '@chakra-ui/react';
import { Button } from '../../../shared/components';

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
  onAnalyze: () => void;
  disabled?: boolean;
}

export const ImagePreview = ({
  file,
  onRemove,
  onAnalyze,
  disabled = false,
}: ImagePreviewProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <Box w="full" maxW="md" mx="auto">
      <Box bg="white" rounded="lg" shadow="md" overflow="hidden">
        <AspectRatio ratio={1}>
          <Box
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={imageUrl}
              alt="Vista previa"
              maxW="full"
              maxH="full"
              objectFit="contain"
            />
          </Box>
        </AspectRatio>

        <Box p={4}>
          <VStack gap={3} align="stretch">
            <Box fontSize="sm" color="gray.600">
              <Text fontWeight="medium">{file.name}</Text>
              <Text fontSize="xs" color="gray.400" mt={1}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Text>
            </Box>

            <Flex gap={2}>
              <Button
                variant="primary"
                size="sm"
                onClick={onAnalyze}
                disabled={disabled}
                flex={1}
              >
                Analizar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                disabled={disabled}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
