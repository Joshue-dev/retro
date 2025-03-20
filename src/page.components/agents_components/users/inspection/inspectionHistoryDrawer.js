import React, {useEffect, useState} from 'react';
import {
  HStack,
  Stack,
  Container,
  Button,
  Tag,
  TagLabel,
  Text,
  VStack,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  useDisclosure,
  Image,
  Spinner,
  Box,
  Flex,
} from '@chakra-ui/react';

import RatingIcon from '../rating';
import RightArrowIcon from 'images/icons/rightArrow.svg';
import LeftArrowIcon from 'images/icons/leftArrow.svg';
import Filter from '/src/page.components/agents_components/inspection/history/filter';
import {generateID} from 'utils/generateId';
import InspectionDetails from './inspectionDetails';
import {OvalLoader} from 'components/common/loaders/AnimatedLoader';

const mode = {
  'in-person': {
    color: '#12D8A0',
    bg: 'rgba(18, 216, 160, 0.10)',
    text: 'In Person',
  },
  video: {
    color: '#4545FE',
    bg: 'rgba(69, 69, 254, 0.10)',
    text: 'Video',
  },
};

const InspectionHistoryDrawer = ({isLoading, data, drawerDisclosure, setAddedParam}) => {
  console.log(data, isLoading);
  const [openDetails, setOpenDetails] = useState(false);

  // Track the selected inspection data
  const [selectedInspectionData, setSelectedInspectionData] = useState(null);

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  // Function to handle inspection item click
  const handleInspectionItemClick = data => {
    setSelectedInspectionData(data);
    setOpenDetails(true);
  };

  return (
    <div>
      <Drawer
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
        closeOnSelect={false}
        placement={screenWidth <= 768 ? 'bottom' : 'right'}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          minW={{base: 'full', md: '450px'}}
          bg="#fff"
          p={{base: `20px`, md: '0px'}}
          mt={{md: '75px'}}
          borderRadius={{base: `12.9px 12.9px 0px 0px`, md: `none`}}
          fontFamily='Euclid Circular B'
        >
          {openDetails === false ? (
            <>
              <HStack
                h="49.699px"
                bg={{md: '#F5F5F5'}}
                padding={{base: `0px 10px`, md: `30px 25px`}}
                justify="space-between"
                align="center"
                position="relative"
                
              >
                <Heading fontFamily='Euclid Circular B'  fontSize="18.9px" fontWeight="700">
                  Inspection History
                </Heading>
                <HStack spacing="15px">
                  <Filter setUrl={setAddedParam} />
                  <VStack
                    position="relative"
                    justify="center"
                    align="center"
                    w="30px"
                    h="30px"
                    borderRadius="5px"
                    transition="0.3s ease-in-out"
                    _hover={{
                      width: '30px',
                      height: '30px',
                    }}
                  >
                    <DrawerCloseButton
                      right="0px"
                      left="0px"
                      my="auto"
                      color="#000"
                      top="0"
                      bottom="0"
                    />
                  </VStack>
                </HStack>
              </HStack>
              <DrawerBody px="0">
                {isLoading ? (
                  <Box width="100%" display="flex" justifyContent="center">
                    <OvalLoader />
                  </Box>
                ) : (
                  <Flex
                    direction={`column`}
                    gap={{base: `20px`, md: `10px`}}
                    maxH={{base: `60vh`, md: `auto`}}
                  >
                    {data?.message?.map(data => (
                      <HStack
                        width="full"
                        padding={'1rem 1.5rem'}
                        justifyContent="space-between"
                        cursor="pointer"
                        key={generateID()}
                        onClick={() => handleInspectionItemClick(data)}
                        border={{base: `1px solid #E4E4E4`, md: `none`}}
                        borderBottom={{md: ``, md: '1px solid #E4E4E4'}}
                        borderRadius={{base: `10px`, md: `none`}}
                      >
                        <HStack gap={'15px'} align={'start'}>
                          <Stack gap={0}>
                            <Image
                              borderRadius={'10px'}
                              h="108px"
                              objectFit="cover"
                              w="108px"
                              src={data?.project_details.image}
                            />
                          </Stack>
                          <Stack alignContent="space-between">
                            <VStack alignItems="flex-start">
                              <Text fontSize="18px" fontWeight="500">
                                {data?.project_details.name}
                              </Text>
                              <HStack gap={0}>
                                {[...Array(5)].map((_, index) => (
                                  <RatingIcon
                                    key={index}
                                    fill={index < data.star_rating ? '#FF9103' : '#CBCBCB'}
                                  />
                                ))}
                              </HStack>
                              <Text fontSize="16px" fontWeight="400">
                                {data?.time}
                              </Text>
                              {mode[data?.tour_method] && (
                                <Tag
                                  p="4.578px 9.156px"
                                  bg={mode[data?.tour_method]?.bg}
                                  color={mode[data?.tour_method]?.color}
                                  borderRadius="full"
                                >
                                  <TagLabel mx="auto">{mode[data?.tour_method]?.text}</TagLabel>
                                </Tag>
                              )}
                            </VStack>
                          </Stack>
                        </HStack>
                        <Image src={RightArrowIcon.src} />
                      </HStack>
                    ))}
                  </Flex>
                )}
              </DrawerBody>
            </>
          ) : (
            <>
              <HStack
                h="49.699px"
                bg={{md: '#F5F5F5'}}
                padding={{base: `0px 10px`, md: `30px 25px`}}
                justify="space-between"
                align="center"
                position="relative"
              >
                <HStack cursor="pointer" alignItems="center" onClick={() => setOpenDetails(false)}>
                  {' '}
                  <img src={LeftArrowIcon.src} />
                  <Heading fontFamily='Euclid Circular B'  fontSize="18.9px" fontWeight="700">
                    Inspection Details
                  </Heading>
                </HStack>
                <HStack spacing="15px">
                  <VStack
                    position="relative"
                    justify="center"
                    align="center"
                    w="30px"
                    h="30px"
                    borderRadius="5px"
                    transition="0.3s ease-in-out"
                    _hover={{
                      width: '30px',
                      height: '30px',
                    }}
                  >
                    <DrawerCloseButton
                      right="0px"
                      left="0px"
                      my="auto"
                      color="#000"
                      top="0"
                      bottom="0"
                    />
                  </VStack>
                </HStack>
              </HStack>
              <DrawerBody px="0">
                <Flex
                  direction={`column`}
                  gap={{base: `20px`, md: `10px`}}
                  maxH={{base: `60vh`, md: `auto`}}
                >
                  <InspectionDetails inspectionData={selectedInspectionData} />
                </Flex>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default InspectionHistoryDrawer;
