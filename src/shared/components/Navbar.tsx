import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Container,
  IconButton,
  VStack,
  Collapsible,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import { ServerStatus } from './ServerStatus';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
];

export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
      w="full"
    >
      <Container maxW="full" px={{ base: 4, md: 6 }} w="full">
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
                  whiteSpace="nowrap"
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
                          ? 'green.200'
                          : 'transparent'
                      }
                      color={
                        location.pathname === item.path
                          ? 'gray.900'
                          : 'gray.400'
                      }
                      shadow={location.pathname === item.path ? 'md' : 'none'}
                      _hover={{
                        color:
                          location.pathname === item.path
                            ? 'gray.900'
                            : 'green.400',
                        bg:
                          location.pathname === item.path
                            ? 'gray.300'
                            : 'gray.800',
                      }}
                    >
                      {item.label}
                    </Box>
                  </Link>
                ))}
              </Flex>
            </Box>

            <ServerStatus size="sm" />

            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={toggleMobileMenu}
              variant="ghost"
              color="white"
              _hover={{ bg: 'primary.900' }}
              aria-label="Toggle mobile menu"
            >
              <Icon as={isMobileMenuOpen ? X : Menu} w="6" h="6" />
            </IconButton>
          </Flex>
        </Flex>

        <Collapsible.Root open={isMobileMenuOpen}>
          <Collapsible.Content>
            <Box
              display={{ base: 'block', md: 'none' }}
              pb={4}
              borderTop="1px"
              borderColor="gray.700"
              mt={4}
            >
              <VStack align="stretch" gap={2}>
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{ textDecoration: 'none' }}
                    onClick={closeMobileMenu}
                  >
                    <Box
                      px={4}
                      py={3}
                      rounded="md"
                      fontSize="sm"
                      fontWeight="medium"
                      transition="all 0.2s"
                      bg={
                        location.pathname === item.path
                          ? 'gray.200'
                          : 'transparent'
                      }
                      color={
                        location.pathname === item.path
                          ? 'gray.900'
                          : 'gray.200'
                      }
                      shadow={location.pathname === item.path ? 'md' : 'none'}
                      _hover={{
                        color:
                          location.pathname === item.path
                            ? 'gray.900'
                            : 'green.400',
                        bg:
                          location.pathname === item.path
                            ? 'gray.300'
                            : 'gray.800',
                        borderColor: 'primary.400',
                      }}
                    >
                      {item.label}
                    </Box>
                  </Link>
                ))}
              </VStack>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Container>
    </Box>
  );
};
