import { useRef } from 'react';
import { Box, Button, VStack, Text, Icon } from '@chakra-ui/react';
import { FiUploadCloud, FiPlus } from 'react-icons/fi';
import { useFileDrop } from '../../../shared/hooks';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string[];
  maxSize?: number;
  disabled?: boolean;
}

export const FileUpload = ({
  onFileSelect,
  accept = ['image/jpeg', 'image/png', 'image/jpg'],
  maxSize = 5 * 1024 * 1024,
  disabled = false,
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isDragOver,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
  } = useFileDrop({
    accept,
    maxSize,
    onFileSelect,
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box w="full" maxW="2xl" mx="auto">
      <Box
        p={12}
        border="2px"
        borderStyle="dashed"
        borderColor={isDragOver ? 'primary.400' : 'gray.300'}
        borderRadius="2xl"
        textAlign="center"
        transition="all 0.3s"
        bg={isDragOver ? 'primary.50' : 'white'}
        _hover={
          !disabled
            ? {
                borderColor: 'primary.300',
                bg: 'primary.50',
                shadow: 'lg',
              }
            : {}
        }
        transform={isDragOver ? 'scale(1.02)' : 'scale(1)'}
        shadow={isDragOver ? 'xl' : 'md'}
        opacity={disabled ? 0.5 : 1}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        onDragOver={!disabled ? handleDragOver : undefined}
        onDragLeave={!disabled ? handleDragLeave : undefined}
        onDrop={!disabled ? handleDrop : undefined}
        onClick={!disabled ? handleButtonClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          disabled={disabled}
        />

        <VStack gap={6}>
          <Box
            w="20"
            h="20"
            bgGradient="linear(to-br, primary.100, primary.200)"
            rounded="2xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            shadow="lg"
            transition="transform 0.3s"
          >
            <Icon
              as={FiUploadCloud}
              w="10"
              h="10"
              color={isDragOver ? 'primary.600' : 'primary.500'}
              transition="color 0.3s"
            />
          </Box>

          <VStack gap={2}>
            <Text fontSize="xl" fontWeight="semibold" color="gray.900">
              {isDragOver
                ? '¡Suelta la imagen aquí!'
                : 'Sube una imagen de hoja de tomate'}
            </Text>
            <Text color="gray.500" mb={1}>
              Arrastra y suelta tu imagen o haz clic para seleccionar
            </Text>
            <Text fontSize="sm" color="gray.400">
              Formatos: PNG, JPG • Tamaño máximo:{' '}
              {(maxSize / 1024 / 1024).toFixed(0)}MB
            </Text>
          </VStack>

          <Button
            colorScheme="blue"
            size="lg"
            disabled={disabled}
            minW="200px"
            shadow="md"
            _hover={{ shadow: 'lg' }}
            transition="all 0.3s"
            onClick={e => {
              e.stopPropagation();
              handleButtonClick();
            }}
          >
            <Icon as={FiPlus} />
            <Text ml={2}>Seleccionar archivo</Text>
          </Button>
        </VStack>
      </Box>

      {error && (
        <Box
          mt={4}
          p={4}
          bg="red.50"
          border="1px"
          borderColor="red.200"
          borderRadius="xl"
          display="flex"
          alignItems="center"
        >
          <Icon
            w="5"
            h="5"
            color="red.500"
            mr={2}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </Icon>
          <Text fontSize="sm" color="red.700" fontWeight="medium">
            {error}
          </Text>
        </Box>
      )}
    </Box>
  );
};
