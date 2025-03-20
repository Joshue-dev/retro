import {motion} from 'framer-motion';
import React from 'react';
import {
  Badge,
  Box,
  Flex,
  Text,
  HStack,
  Image,
  Radio,
  RadioGroup,
  VStack,
  Heading,
} from '@chakra-ui/react';
import collapsedIcon from '/src/images/icons/collapsed-icon.svg';
import draftsIcon from '/src/images/icons/drafts-icon.png';
import archiveIcon from '/src/images/icons/archived-icon.png';
import {themeStyles} from '/src/theme';
import {useRouter} from 'next/router';
import backArrow from '/src/images/icons/back-arrow.png';
import {Button} from '../../../../../../ui-lib/ui-lib.components';

export default function CollapsedHeader({handleCollapsed}) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <Box>
      <motion.div
        className="box"
        initial={{opacity: 0.8, scale: 0.1}}
        animate={{opacity: 1, scale: 1}}
        transition={{
          type: 'tween',
          duration: 0.3,
          ease: 'easeIn',
        }}
      >
        <Flex w="full" justify="space-between" mt="30px" mb={4}>
          <HStack onClick={handleBack}>
            <Image
              style={{cursor: 'pointer'}}
              mr={2}
              height="50px"
              src={backArrow.src}
              alt="back_arrow"
            />
            <Heading fontFamily='Euclid Circular B' {...themeStyles.textStyles.h3}>Listings</Heading>
          </HStack>
          <Flex justify="flex-end" w="full" align="center">
            <HStack spacing={6} align="center" h="48px">
              {/* <Button
                bg="#4545FE"
                borderRadius="12px"
                onClick={handleCollapsed}
              >
                <HStack spacing="4px">
                  <Image
                    src={collapsedIcon.src}
                    alt="expand Icon"
                    boxSize="18px"
                  />
                  <Text
                    as="span"
                    color="#ffffff"
                    fontSize="16px"
                    fontWeight="400"
                  >
                    Collapse List
                  </Text>
                </HStack>
              </Button> */}
              {/* <Filter /> */}
            </HStack>
          </Flex>
        </Flex>
      </motion.div>
    </Box>
  );
}
