import {HStack, Image, Stack, Text} from '@chakra-ui/react';

export const ContactComponent = ({contactObj}) => {
  return (
    <HStack
      padding="14px 22px 13px 25.074px"
      bg="#F9FAFB"
      justify="space-between"
      border="0.5px solid #E4E4E4"
      borderRadius={'4px'}
      w={'full'}
    >
      <HStack spacing="15px">
        <Image
          alt="profile image icon"
          borderRadius="full"
          boxSize="38.5px"
          src={contactObj.img}
          objectFit="cover"
        />
        <Stack spacing="10px" textTransform={'capitalize'}>
          <Text fontSize="14px" fontWeight="500" color="#191919" lineHeight={'18px'}>
            {contactObj.name}
          </Text>
          <Text fontSize="12px" fontWeight="400" color="#606060" lineHeight={'15px'}>
            {contactObj.phone_number}
          </Text>
        </Stack>
      </HStack>
  
    </HStack>
  );
};

export default ContactComponent;
