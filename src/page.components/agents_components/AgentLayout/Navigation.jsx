import {
  Box,
  ButtonGroup,
  Center,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  ScaleFade,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {dashboardTabs} from '../../../constants/dummy/layout';
import {SearchIcon} from '@chakra-ui/icons';

export function AgentsLayoutNavigation({activePage, children, ...restProps}) {
  const router = useRouter();
  const [activeBg, setActiveBg] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const handleNav = linkText => {
    const link = linkText.toLowerCase();
    return router.push(`/agents/${link === 'referrals' ? 'users' : link}`);
  };

  useEffect(() => {
    const activeLink = activePage && activePage.toLowerCase();
    const bg = activeLink === 'listings' ? '#F5F5F5' : '';

    router.pathname.indexOf(activeLink) === -1 ? setActiveBg(bg) : setActiveBg('#F5F5F5');
  }, [router.pathname, activePage]);

  useEffect(() => {
    router?.events?.on('routeChangeStart', url => {
      setShowProgress(true);
    });
    router?.events?.on('routeChangeComplete', url => {
      setShowProgress(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      // bg="#ffffff"
      h={{base: '0px', lg: 'fit-content'}}
      color="#191919"
      mt={{base: '-55px', lg: '0px'}}
    >
      <HStack spacing={4} alignItems={'center'} justify="center" w="100%" mx="auto">
        <Tabs w="full" variant="rounded" mx="auto" align="center" justify="center">
          <TabList
            align="center"
            h="58px"
            bg="#FFF"
            px="5rem"
            justifyContent="space-between"
            position="fixed"
            zIndex={1200}
            w="full"
            top="4.4rem"
            boxShadow="md"
            // borderBottom={'1px solid #e4e4e4'}
            mb={{md: 4}}
            py={2}
            display={{base: 'none', md: 'none', lg: 'flex'}}
          >
            {dashboardTabs.map((link, index) => {
              const isActive =
                activePage.toLowerCase() === link?.linkText.toLocaleLowerCase() ||
                (activePage.toLowerCase() === 'customers' &&
                  link.linkText.toLowerCase() === 'referrals');
              return (
                <Tab
                  key={index}
                  borderRadius="lg"
                  onClick={() => handleNav(link.linkText)}
                  bg={isActive ? '#F5F5F5' : 'transparent'}
                >
                  <ButtonGroup isAttached variant="outline">
                    <Center
                      fontSize="14px"
                      variant="ghost"
                      color={isActive ? '#191919' : '#606060'}
                      fontWeight={isActive ? 500 : 400}
                    >
                      <Image
                        alt=""
                        alignSelf="center"
                        boxSize={'20px'}
                        src={isActive ? link.dark_iconSrc.src : link.iconSrc.src}
                        mr="5px"
                      />
                      {link.linkText}
                    </Center>
                  </ButtonGroup>
                </Tab>
              );
            })}
            <InputGroup alignItems="center" maxW="320px">
              <Input
                pr="4.5rem"
                type="search"
                color="#919191"
                background="#F5f5f5"
                borderRadius="lg"
                _placeholder={{
                  color: 'gray.500',
                  fontsize: '12px',
                  textColor: '#919191',
                }}
                py={'1.25rem'}
                placeholder="Search"
                border={'1px solid #E4E4E4'}
              />
              <InputRightElement width="4.5rem">
                <SearchIcon cursor="pointer" color="gray.500" />
              </InputRightElement>
            </InputGroup>
          </TabList>
          {showProgress && (
            <Progress
              w="full"
              size="xs"
              left={'0'}
              colorScheme="gray"
              top={{base: '3.75rem', lg: '8rem'}}
              position="fixed"
              isIndeterminate
              zIndex={'10'}
            />
          )}
          <TabPanels
            position="relative"
            // top={{base: '10vh', lg: '15vh'}}
            top={{base: '3.75rem', lg: '8rem'}}
          >
            <TabPanel bg="#FAFAFA" px="0" pb="0px">
              <Box
                paddingInline={{base: '20px'}}
                py="28px"
                pb={{lg: '30px'}}
                mx="auto"
                // maxW={{base: 'full', lg: 'max-content'}}
                minW={{xl: '1301px'}}
                textAlign={'left'}
                {...restProps}
              >
                <ScaleFade key={router.route} initialScale={0.9} in="true">
                  {children}
                </ScaleFade>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </Box>
  );
}
