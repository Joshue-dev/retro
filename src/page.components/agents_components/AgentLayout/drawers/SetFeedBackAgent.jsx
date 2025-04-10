import React from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import EmptyStarIcon from '/src/images/icons/emptyStarForFeedback.svg';
import starIcon from '/src/images/icons/starForFeedBack.svg';
import {STORENAMEFROMDOMAIN} from '/src/constants/routes';

export const SetFeedBackForAgent = ({
  setRating,
  rating,
  fromAssets,
  message,
  handleMessage,
  isValid,
  handleSubmit,
  feedbackMutation,
}) => {
  return (
    <Stack w="full" spacing="none">
      <Text fontSize="12px" maxW="336.673px" fontWeight="300" mb="20.72px">
        {fromAssets
          ? `We would greatly appreciate your feedback on this property to help us enhance our services for you`
          : `Thank you for using ${STORENAMEFROMDOMAIN}! Help us improve our service
        by providing some feedback.`}
      </Text>
      <Ratings setRating={setRating} rating={rating} />
      <Text
        textAlign="start"
        w="full"
        mb="4.44px"
        as="label"
        htmlFor="message"
        fontSize="11.222px"
        //
        fontWeight="300"
      >
        Comment
      </Text>
      <Textarea
        // w="291px"
        py="6.41px"
        //
        id="message"
        value={message}
        w="full"
        h="105px"
        borderRadius="3.09px"
        fontSize={'14px'}
        resize="none"
        name="message"
        bg="rgba(217, 217, 217, 0.10)"
        mb="10px"
        border=" 0.309px solid #747474"
        _focus={{
          border: ` 0.309px solid #747474 !important`,
        }}
        _hover={{
          border: ` 0.309px solid #747474 !important`,
        }}
        _focusVisible={{
          border: ` 0.309px solid #747474 !important`,
        }}
        onChange={handleMessage}
      />

      <HStack w="full" justify="end">
        <Button
          mt="20.04px"
          _hover={{
            opacity: '1',
          }}
          borderRadius="4px"
          isDisabled={!isValid}
          onClick={handleSubmit}
          h="44.088px"
          w="121.042px"
          fontSize="12.826px"
          fontWeight="400"
          isLoading={feedbackMutation.isLoading}
          color="#fff"
          bg="#0D0D0D"
        >
          Submit
        </Button>
      </HStack>
    </Stack>
  );
};

export const Ratings = ({rating, setRating, forHistory, starStyle, ...rest}) => {
  const handleStarSelection = idx => {
    if (idx === ~~rating) {
      return setRating(idx - 1);
    }
    return setRating(idx);
  };

  return (
    <HStack mb="20.72px" spacing="4px" {...rest}>
      {[1, 2, 3, 4, 5].map((item, idx) => {
        return (
          <HStack key={idx} h="31.8px" align="center" justify="center" w="31.88px" {...starStyle}>
            {item <= rating ? (
              <Image
                w="31.88px"
                h="31.8px"
                src={starIcon.src}
                onClick={() => (forHistory ? null : handleStarSelection(item))}
                alt="selected star icon"
                fontSize="3px"
                cursor={forHistory ? 'default' : 'pointer'}
                {...starStyle}
              />
            ) : (
              <Image
                w="31.88px"
                h="31.8px"
                src={EmptyStarIcon.src}
                cursor={forHistory ? 'default' : 'pointer'}
                onClick={() => (forHistory ? null : handleStarSelection(item))}
                alt="selected star icon"
                fontSize="3px"
                {...starStyle}
              />
            )}
          </HStack>
        );
      })}
    </HStack>
  );
};
