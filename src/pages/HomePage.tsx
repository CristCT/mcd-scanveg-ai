import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Icon,
  Stack,
  Card,
} from '@chakra-ui/react';
import { FiZap, FiCheck, FiSmartphone } from 'react-icons/fi';
import { Layout } from '../shared/components';
import { ScanContainer } from '../features/scan';

export const HomePage = () => {
  return (
    <Layout>
      <Container maxW="100%" py={12}>
        <VStack gap={16} align="center" textAlign="center" mb={10}>
          <Box position="relative">
            <Heading fontSize={{ base: '4xl', md: '6xl' }}>
              <Text>MCD ScanVeg AI</Text>
            </Heading>

            <Box
              position="absolute"
              top="-7"
              right="0"
              w="4"
              h="4"
              bg="primary.200"
              rounded="full"
              opacity="0.5"
              animation="pulse 2s infinite"
            />
            <Box
              position="absolute"
              top="-7"
              right="0"
              w="4"
              h="4"
              bg="blue.200"
              rounded="full"
              opacity="0.9"
              animation="pulse 2s infinite"
              animationDelay="1s"
            />
          </Box>

          <Text color="gray.600">
            Detecta enfermedades en hojas de tomate usando{' '}
            <Text as="span" fontWeight="semibold" color="primary.600">
              inteligencia artificial
            </Text>
            .
            <br />
            Sube una imagen y obtén un diagnóstico instantáneo.
          </Text>
        </VStack>

        <Box display="flex" justifyContent="center" mb={10}>
          <Box w="full" maxW="2xl">
            <ScanContainer />
          </Box>
        </Box>

        <Stack direction="row" wrap="wrap" justify="center">
          <Card.Root
            width="320px"
            transition="all 0.3s"
            _hover={{
              transform: 'translateY(-4px)',
              shadow: 'xl',
            }}
          >
            <Card.Body gap="2" textAlign="center" padding={16}>
              <Box mx="auto" display="flex" justifyContent="center">
                <Icon as={FiZap} color="primary.600" />
              </Box>
              <Card.Title mb={6}>Análisis Rápido</Card.Title>
              <Card.Description color="gray.600" lineHeight="relaxed">
                Obtén resultados en segundos con nuestra IA entrenada
                específicamente para hojas de tomate.
              </Card.Description>
            </Card.Body>
          </Card.Root>

          <Card.Root
            width="320px"
            transition="all 0.3s"
            _hover={{
              transform: 'translateY(-4px)',
              shadow: 'xl',
            }}
          >
            <Card.Body gap="2" textAlign="center" padding={16}>
              <Box mx="auto" display="flex" justifyContent="center">
                <Icon as={FiCheck} color="blue.600" />
              </Box>
              <Card.Title mb={6}>Alta Precisión</Card.Title>
              <Card.Description color="gray.600" lineHeight="relaxed">
                Modelo entrenado con miles de imágenes para garantizar la máxima
                precisión en el diagnóstico.
              </Card.Description>
            </Card.Body>
          </Card.Root>

          <Card.Root
            width="320px"
            transition="all 0.3s"
            _hover={{
              transform: 'translateY(-4px)',
              shadow: 'xl',
            }}
          >
            <Card.Body gap="2" textAlign="center" padding={16}>
              <Box mx="auto" display="flex" justifyContent="center">
                <Icon as={FiSmartphone} color="green.600" />
              </Box>
              <Card.Title mb={6}>Fácil de Usar</Card.Title>
              <Card.Description color="gray.600" lineHeight="relaxed">
                Interfaz intuitiva que permite a cualquier persona analizar sus
                plantas sin conocimientos técnicos.
              </Card.Description>
            </Card.Body>
          </Card.Root>
        </Stack>
      </Container>
    </Layout>
  );
};
