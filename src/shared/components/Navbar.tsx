import { Box, Flex, Text, Icon, Container } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [{ label: 'Inicio', path: '/' }];

export const Navbar = () => {
  const location = useLocation();

  return (
    <Box
      bg="white"
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
                  bg="linear-gradient(135deg, #22c55e, #15803d)"
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  shadow="lg"
                >
                  <Icon as={FaHeart} w="6" h="6" color="white" />
                </Box>
                <Text
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

          <Box display={{ base: 'none', md: 'block' }}>
            <Flex align="baseline" gap={4}>
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
                      color: 'gray.900',
                      bg: 'gray.100',
                    }}
                  >
                    {item.label}
                  </Box>
                </Link>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
