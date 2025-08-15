import { Box, Flex, Text, Icon, Container } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { ServerStatus } from './ServerStatus';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [{ label: 'Inicio', path: '/' }];

export const Navbar = () => {
  const location = useLocation();

  return (
    <Box
      bg="black"
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor="gray.200"
      shadow="lg"
      position="sticky"
      top="0"
      zIndex="50"
    >
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <Flex justify="space-between" align="center" h="16">
          <Flex align="center">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Flex align="center" gap={3}>
                <Box
                  w="10"
                  h="10"
                  bgGradient="linear(135deg, primary.500, primary.700)"
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  shadow="lg"
                  transition="transform 0.2s"
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  <Icon as={FaLeaf} w="6" h="6" color="white" />
                </Box>
                <Text
                  bgColor="white"
                  fontSize="xl"
                  fontWeight="bold"
                  bgGradient="linear(to-r, gray.900, primary.700)"
                  bgClip="text"
                >
                  MCD ScanVeg AI
                </Text>
              </Flex>
            </Link>
          </Flex>

          <Flex align="center" gap={4}>
            <Box display={{ base: 'none', md: 'flex' }}>
              <Flex align="center" gap={4}>
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      px={3}
                      py={2}
                      rounded="md"
                      fontSize="sm"
                      fontWeight="medium"
                      transition="all 0.2s"
                      bg={
                        location.pathname === item.path
                          ? 'primary.100'
                          : 'transparent'
                      }
                      color={
                        location.pathname === item.path
                          ? 'primary.700'
                          : 'gray.600'
                      }
                      _hover={{
                        color: 'primary.600',
                        bg: 'primary.50',
                      }}
                    >
                      {item.label}
                    </Box>
                  </Link>
                ))}
              </Flex>
            </Box>

            {/* Server Status */}
            <ServerStatus size="sm" />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
