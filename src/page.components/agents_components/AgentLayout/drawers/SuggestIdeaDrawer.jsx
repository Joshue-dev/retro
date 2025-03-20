import React, {useState} from 'react';
import {CreateToast} from '/src/ui-lib/ui-lib.components/Toast/createToast.js';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {UploadImages} from 'components/navbarMenuComponent/UploadLoadDocForNavBar';
import {toastForError} from 'components/navbarMenuComponent/../../utils/toastForErrors';
import {suggestAFeature} from 'components/navbarMenuComponent/../../api/navbarMenu';
import {useMutation} from 'react-query';
import useLocalStorage from 'utils/hooks/useLocalStorage';

export const SuggestAnIdeaDrawer = ({children}) => {
  const modalDisclosure = useDisclosure();
  const [document, setDocument] = useState([]);
  const [message, setMessage] = useState('');
  const toast = useToast();
  const toaster = CreateToast();

  const [objOfkeyValues] = useLocalStorage(['a_Token', 'businessId']);

  const agentToken = objOfkeyValues?.a_Token;
  const businessId = objOfkeyValues?.businessId;

  const handleClosedModal = () => {
    modalDisclosure.onClose();
    setDocument([]);
    return setMessage('');
  };

  const suggestAFeatureMutation = useMutation(
    formData => suggestAFeature(formData, businessId, agentToken),
    {
      onSuccess: res => {
        toaster("Thank you for your suggestion! It's now in our review process.");
        handleClosedModal();
      },
      onError: err => {
        toastForError(err, true, toast);
      },
    }
  );

  const handleMessage = e => {
    return setMessage(e.target.value);
  };
  const handleSubmit = () => {
    const image = document.map(item => item?.image.replace('data:', '').replace(/^.+,/, ''));
    const body = {image, message};
    return suggestAFeatureMutation.mutate(body);
  };

  const isValid = message.trim() && document.length;
  return (
    <>
      <HStack
        onClick={modalDisclosure.onOpen}
        cursor="pointer"
        w="full"
        spacing="5px"
        align="center"
      >
        {children}
      </HStack>
      <Drawer
        isOpen={modalDisclosure.isOpen}
        onClose={handleClosedModal}
        px="40px"
        pt="37px"
        pb="27px"
        // darkMode
        minW="648px"
        minH="592px"
        borderRadius="16px"
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />

        <DrawerContent minW="400px" color="#0D0D0D" bg="white" mt={{base: '0px', lg: '75px'}} fontFamily='Euclid Circular B'>
          <HStack
            boxShadow="0px 3.20641px 6.41283px 0px rgba(0, 0, 0, 0.02)"
            py="12px"
            bg="#F5F5F5"
            pl="27.3px"
            pr="19.9px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <HStack spacing="8px">
              <Text fontSize="20px" fontWeight={600} color="#191919">
                Suggest an idea
              </Text>
            </HStack>

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
              <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
            </VStack>
          </HStack>
          <DrawerBody pt="10px" pb="39" pl="22.75px" pr="21.34px">
            <Stack w="full" spacing="none">
              <Text fontSize="12px" maxW="336.673px" fontWeight="300">
                Do you have any new ideas or desired enhancements for our app.
              </Text>
              <Text
                textAlign="start"
                w="full"
                mt="30.52px"
                mb="4.44px"
                as="label"
                htmlFor="message"
                fontSize="11.222px"
                fontWeight="300"
              >
                Comment
              </Text>
              <Textarea
                // w="291px"
                py="6.41px"
                id="message"
                value={message}
                w="full"
                h="105px"
                fontSize={'14px'}
                resize="none"
                name="message"
                mb="10px"
                // value={formik.values.message}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                borderRadius="3.09px"
                bg="rgba(217, 217, 217, 0.10)"
                border="1px solid #747474"
                _focus={{
                  border: `0.5px solid #747474 !important`,
                }}
                _hover={{
                  border: `0.5px solid #747474 !important`,
                }}
                _focusVisible={{
                  border: `0.5px solid #747474 !important`,
                }}
                onChange={handleMessage}
              />
              <Text
                textAlign="start"
                mb="4.44px"
                as="label"
                htmlFor="uploadImage"
                w="full"
                fontSize="11.222px"
                fontWeight="300"
              >
                Upload image
              </Text>
              <UploadImages
                maxFiles={5}
                id="document"
                name="document"
                files={document}
                setFiles={setDocument}
                lable={'Upload image'}
                message="Upload image"
                border={'0.3px solid #DADADA'}
                w="full"
                h="78.557px"
              />
              <HStack w="full" justify="end">
                <Button
                  color="#FFFFFF"
                  mt="19.9px"
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
                  isLoading={suggestAFeatureMutation.isLoading}
                  bg="#0D0D0D"
                >
                  Submit
                </Button>
              </HStack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
