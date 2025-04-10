import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';

import LeftArrowIcon from 'images/icons/leftArrow.svg';
import React, {useEffect, useState} from 'react';
import {generateID} from 'utils/generateId';
import RatingIcon from './rating';
import ReviewDetails from './reviewDetails';
import {demarcatedDateTime} from 'utils/formatDate';

const See_review = ({isOpen, onClose, data}) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedReviwData, setSelectedReviewData] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <div>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        closeOnSelect={false}
        placement={screenWidth <= 768 ? 'bottom' : 'right'}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          position="relative"
          zIndex={100}
          mt={{base: '0px', lg: '75px'}}          minW={{base: `100%`, md: '500px'}}
          bg="#fff"
          p="0px"
          borderRadius={{base: `12.9px 12.9px 0px 0px`, md: `0px`}}
          fontFamily='Euclid Circular B'
        >
          <HStack
            mb="20px"
            py="12px"
            h="49.699px"
            bg={{base: '#fff', md: '#F5F5F5'}}
            px="25px"
            justify="space-between"
            align="center"
            position="relative"
            borderRadius={{base: `12.9px 12.9px 0px 0px`, md: `0px`}}
          >
            <Heading fontFamily='Euclid Circular B' fontSize="18.9px" fontWeight="700">
              Review
            </Heading>
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
          <DrawerBody px="1rem" pb={`50px`}>
            {data?.feedback?.feedback.length === 0 && (
              <Text textAlign="center">No reviews yet</Text>
            )}
            {data?.feedback?.feedback.map((item, index) => (
              <VStack
                padding="1rem"
                borderRadius="12px"
                border="1px solid #E4E4E4"
                width="100%"
                key={generateID()}
                alignItems="flex-start"
                my="0.8rem"
              >
                <HStack justifyContent="space-between" width="100%">
                  <Text fontSize="16px" fontWeight="400">
                    Rating & Feedback
                  </Text>
                  <Text fontSize="12px" fontWeight="400">
                    {demarcatedDateTime(item?.created_at)}
                  </Text>
                </HStack>
                <Stack my="0.5rem">
                  <HStack>
                    {[...Array(5)].map((_, index) => (
                      <RatingIcon
                        key={index}
                        fill={index < item.star_rating ? '#FF9103' : '#CBCBCB'}
                      />
                    ))}
                  </HStack>
                </Stack>
                <Stack background="#F5F5F5" borderRadius="12px" padding="12px 16px" width="100%">
                  <Text fontSize="13px" fontWeight="500">
                    Feedback
                  </Text>
                  <Text fontSize="12px" fontWeight="300">
                    {item?.feedback}
                  </Text>
                </Stack>
              </VStack>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default See_review;
