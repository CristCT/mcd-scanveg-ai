import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Icon,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FiZap, FiCheck, FiSmartphone } from 'react-icons/fi';
import { Layout } from '../shared/components';
import { ScanContainer } from '../features/scan';

export const HomePage = () => {
  return (
    <Layout>
      <Container maxW="7xl" px={{ base: 4, md: 6 }} py={12}>
        <VStack gap={16} align="center" textAlign="center" mb={20}>
          <Box position="relative">
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              mb={6}
            >
              <Text
                bgGradient="linear(to-r, primary.600, primary.500, blue.500)"
                bgClip="text"
              >
                MCD ScanVeg AI
              </Text>
            </Heading>

            <Box
              position="absolute"
              top="-2"
              left="-4"
              w="12"
              h="12"
              bg="primary.200"
              rounded="full"
              opacity="0.5"
              animation="pulse 2s infinite"
            />
            <Box
              position="absolute"
              top="-6"
              right="-8"
              w="8"
              h="8"
              bg="blue.200"
              rounded="full"
              opacity="0.6"
              animation="pulse 2s infinite"
              animationDelay="1s"
            />
          </Box>

          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            color="gray.600"
            maxW="3xl"
            lineHeight="relaxed"
          >
            Detecta enfermedades en hojas de tomate usando{' '}
            <Text as="span" fontWeight="semibold" color="primary.600">
              inteligencia artificial
            </Text>
            .
            <br />
            Sube una imagen y obtén un diagnóstico instantáneo.
          </Text>
        </VStack>

        <Box display="flex" justifyContent="center" mb={20}>
          <Box w="full" maxW="2xl">
            <ScanContainer />
          </Box>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
          <GridItem>
            <Box
              textAlign="center"
              p={8}
              bg="white"
              backdropFilter="blur(4px)"
              rounded="2xl"
              shadow="lg"
              border="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{
                shadow: 'xl',
                transform: 'translateY(-4px)',
                bg: 'gray.50',
              }}
              role="group"
            >
              <Box
                mx="auto"
                w="16"
                h="16"
                bgGradient="linear(to-br, primary.100, primary.200)"
                rounded="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
                transition="transform 0.3s"
                _groupHover={{ transform: 'scale(1.1)' }}
              >
                <Icon as={FiZap} w="8" h="8" color="primary.600" />
              </Box>
              <Heading size="lg" color="gray.900" mb={3}>
                Análisis Rápido
              </Heading>
              <Text color="gray.600" lineHeight="relaxed">
                Obtén resultados en segundos con nuestra IA entrenada
                específicamente para hojas de tomate.
              </Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              textAlign="center"
              p={8}
              bg="white"
              backdropFilter="blur(4px)"
              rounded="2xl"
              shadow="lg"
              border="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{
                shadow: 'xl',
                transform: 'translateY(-4px)',
                bg: 'gray.50',
              }}
              role="group"
            >
              <Box
                mx="auto"
                w="16"
                h="16"
                bgGradient="linear(to-br, blue.100, blue.200)"
                rounded="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
                transition="transform 0.3s"
                _groupHover={{ transform: 'scale(1.1)' }}
              >
                <Icon as={FiCheck} w="8" h="8" color="blue.600" />
              </Box>
              <Heading size="lg" color="gray.900" mb={3}>
                Alta Precisión
              </Heading>
              <Text color="gray.600" lineHeight="relaxed">
                Modelo entrenado con miles de imágenes para garantizar la máxima
                precisión en el diagnóstico.
              </Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              textAlign="center"
              p={8}
              bg="white"
              backdropFilter="blur(4px)"
              rounded="2xl"
              shadow="lg"
              border="1px"
              borderColor="gray.200"
              transition="all 0.3s"
              _hover={{
                shadow: 'xl',
                transform: 'translateY(-4px)',
                bg: 'gray.50',
              }}
              role="group"
            >
              <Box
                mx="auto"
                w="16"
                h="16"
                bgGradient="linear(to-br, green.100, green.200)"
                rounded="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={6}
                transition="transform 0.3s"
                _groupHover={{ transform: 'scale(1.1)' }}
              >
                <Icon as={FiSmartphone} w="8" h="8" color="green.600" />
              </Box>
              <Heading size="lg" color="gray.900" mb={3}>
                Fácil de Usar
              </Heading>
              <Text color="gray.600" lineHeight="relaxed">
                Interfaz intuitiva que permite a cualquier persona analizar sus
                plantas sin conocimientos técnicos.
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};
