import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  FormControl,
  ModalOverlay,
  Select,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {useFormik} from 'formik';
import calenderIcon from '/src/images/icons/agent_req_calendar.svg';
import imageIcon from '/src/images/icons/image-upload.png';
import docIcon from '/src/images/icons/doc_settings_icon.svg';

import {motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {updateAgentSettingsInfo} from '../../../api/agents';
import {encodeFileToBase64} from '../../../utils';
import {changeDateFormat} from '../../../utils/formatDate';
import {STORENAMEFROMDOMAIN} from '../../../constants/routes';

const UpdateId = ({isOpen, onClose, refetch}) => {
  const [files, setFiles] = useState('');

  const [dateError, setDateError] = useState({exp: '', issu: ''});
  const [docDate, setDocDate] = useState({exp: '', issu: ''});
  const [idError, setIdNumError] = useState('');

  const [imageSrc, setImageSrc] = useState('');

  const toast = useToast();
  const queryClient = useQueryClient();

  const store_name = STORENAMEFROMDOMAIN;

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      const base64Arr = document.map(item => item.image);
      let payload;
      if (type == 'profile') {
        payload = {document: base64Arr, ...values};
      } else {
        payload = {documents: base64Arr, ...values};
      }
      onUpload(payload);
    },
  });

  const handleChange = async e => {
    const file = e.target.files[0];

    if (file?.size > 2000000) {
      return toast({
        title: 'hmm...',

        description: `File too large: file is larger than 2MB`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    }

    const result = e.target.files[0];
    setImageSrc(URL?.createObjectURL(e.target.files[0]));
    return setFiles(result);
    setImageSrc('');
  };

  // const uploadDoc = async () => {
  //   const prefixRegex =
  //     /^data:(image\/(png|jpeg|gif)|application\/pdf);base64,/;
  //   const result = await encodeFileToBase64(files);

  //   return mutation.mutate({
  //     document: result.replace(prefixRegex, ""),
  //   });
  // };

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const mutation = useMutation(formData => updateAgentSettingsInfo(formData), {
    onSuccess: async res => {
      // formik.resetForm();

      // setIsClicked(false);
      queryClient.invalidateQueries(['agents_settings_data']);
      await queryClient.refetchQueries(['agents_settings_data']);
      // await refetch();
      toast({
        title: 'changes updated successfully',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
      clearAll();
      return onClose();
    },
    onError: res => {
      // setIsClicked(false);
      // formik.resetForm();
      return toast({
        title: res?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
        description: `${
          res?.response?.data?.message ??
          res?.response?.message ??
          res?.message ??
          'Something went wrong,kindly check your network connection'
        }`,
        status: 'error',
        duration: 8000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleDocDate = e => {
    const presentDate = new Date();
    const inputValue = new Date(e.target.value);
    const year = inputValue.getFullYear();
    const month = String(inputValue.getMonth() + 1).padStart(2, '0');
    const day = String(inputValue.getDate()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;

    if (e.target.name === 'exp') {
      if (presentDate >= inputValue) {
        return setDateError({
          ...dateError,
          exp: 'hmm, selected date is expired',
        });
      } else {
        setDateError({
          ...dateError,
          exp: '',
        });
        return setDocDate({...docDate, exp: formattedDate});
      }
    }
    if (e.target.name === 'issu') {
      if (presentDate <= inputValue) {
        return setDateError({
          ...dateError,
          issu: 'hmm, selected date is invalid',
        });
      } else {
        setDateError({
          ...dateError,
          issu: '',
        });
        return setDocDate({...docDate, issu: formattedDate});
      }
    }
  };
  const isANumber = input => {
    const numericPattern = /^\d+$/;
    if (!numericPattern.test(input)) {
      setIdNumError('hmm,invalid format');
    } else {
      setIdNumError('');
    }
  };

  const clearAll = () => {
    formik.setValues({});
    setDocDate({exp: '', issu: ''});
    setFiles('');
    return setImageSrc('');
  };

  const OnClickButton = async () => {
    const prefixRegex = /^data:(image\/(png|jpeg|gif)|application\/pdf);base64,/;
    const result = await encodeFileToBase64(files);

    return mutation.mutate({
      document: [result.replace(prefixRegex, '')],
      id_update: true,
      store_name,
      doc_type: formik.values.doc_type,
      id_number: formik.values.id_number,
      exp_date: docDate.exp,
      issue_date: docDate.issu,
    });
  };

  const isValid =
    !idError &&
    !dateError.exp &&
    !dateError.issu &&
    formik.values.doc_type &&
    formik.values.id_number &&
    docDate.exp &&
    docDate.issu &&
    files;

  return (
    <Modal
      isCentered
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={() => (clearAll(), onClose())}
      scrollBehavior="inside"
      blockScrollOnMount={'true'}
      size={'lg'}
      h={'550px'}
    >
      <ModalOverlay bg="rgba(0,0,0,0.85)" />
      <ModalContent
        px={'38px'}
        py={'15px'}
        shadow="lg"
        borderRadius="2xl"
        boxShadow="0px 40px 80px -1px rgba(31, 91, 242, 0.27)"
      >
        <ModalCloseButton onClose={() => (clearAll(), onClose())} />

        <ModalBody px={'0px'} my={'10px'} py={'5px'}>
          <VStack w="full" spacing={'20px'}>
            <Box w="full" position="relative">
              <Input
                required
                type="text"
                id="id_number"
                name="id_number"
                border="1px solid #CBCBCB"
                borderRadius="8px"
                onChange={formik.handleChange}
                onBlur={e => isANumber(e.target.value)}
                value={formik.values.id_number}
                error={formik.touched.id_number && formik.errors.id_number}
                placeholder="Documents Number"
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Text fontSize="10px" position="absolute" bottom="-40%" left="0" color="red">
                {idError}
              </Text>
            </Box>

            <Select
              required
              type="text"
              id="doc_type"
              name="doc_type"
              border="1px solid #CBCBCB"
              borderRadius="8px"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.doc_type && formik.errors.doc_type}
              value={formik.values.doc_type}
              placeholder="Document Type"
              _placeholder={{
                color: 'gray.500',
              }}
              fontSize="16px"
              h={'48px'}
            >
              <option value="International Passport">International Passport</option>
              <option value="National Identity Card">National Identity Card</option>
              <option value="Driver License">Driver License</option>
            </Select>
            <HStack spacing="20px" alignSelf="start">
              <HStack position="relative" h="42px" borderBottom="1px solid #CBCBCB !important">
                {docDate.issu ? (
                  <Text fontSize="14px">{changeDateFormat(docDate.issu)}</Text>
                ) : (
                  <Text>Issu.date</Text>
                )}
                <Box position="relative">
                  <Input
                    type="date"
                    border="none"
                    name="issu"
                    onChange={handleDocDate}
                    sx={{
                      '::-webkit-calendar-picker-indicator': {
                        background: 'transparent',
                      },
                    }}
                    w="50px"
                  />
                  <VStack
                    margin="0 auto"
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    position="absolute"
                    pointerEvents="none"
                  >
                    <Image
                      right="0"
                      pointerEvents="none"
                      top="0"
                      bottom="0"
                      margin="auto"
                      display="flex"
                      align-items="center"
                      cursor="pointer"
                      alt="calender icon"
                      boxSize="24px"
                      src={calenderIcon.src}
                    />
                  </VStack>
                </Box>

                {dateError.issu ? (
                  <Text position="absolute" fontSize="10px" bottom="-40%" color="red" left="0">
                    {dateError.issu}
                  </Text>
                ) : (
                  ''
                )}
              </HStack>
              <HStack position="relative" h="42px" borderBottom="1px solid #CBCBCB !important">
                {docDate.exp ? (
                  <Text fontSize="14px">{changeDateFormat(docDate.exp)}</Text>
                ) : (
                  <Text>Exp.date</Text>
                )}
                <Box position="relative">
                  <Input
                    type="date"
                    border="none"
                    onChange={handleDocDate}
                    name="exp"
                    sx={{
                      '::-webkit-calendar-picker-indicator': {
                        background: 'transparent',
                      },
                    }}
                    w="50px"
                  />
                  <VStack
                    margin="0 auto"
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    position="absolute"
                    pointerEvents="none"
                  >
                    <Image
                      right="0"
                      pointerEvents="none"
                      top="0"
                      bottom="0"
                      margin="auto"
                      display="flex"
                      align-items="center"
                      cursor="pointer"
                      alt="calender icon"
                      boxSize="24px"
                      src={calenderIcon.src}
                    />
                  </VStack>
                </Box>
                {dateError.exp ? (
                  <Text position="absolute" fontSize="10px" bottom="-40%" color="red" left="0">
                    {dateError.exp}
                  </Text>
                ) : (
                  ''
                )}
              </HStack>
            </HStack>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              h="219px"
              w="full"
              position="relative"
              borderRadius="32px"
              border="1px solid #4545FE"
            >
              {files ? (
                files.type.includes('application') ? (
                  <HStack
                    bg="rgba(62,62,66,0.08)"
                    position="relative"
                    spacing="9px"
                    borderRadius="5px"
                    px="20px"
                    py="10px"
                    boxShadow=" 0 0 20px rgba(0,0,0,0.03)"
                    // transform="translateY(-5px)"
                  >
                    <Image src={docIcon.src} alt="doc icon" />

                    <Text
                      maxW="200px"
                      fontSize="14px"
                      fontWeight="600"
                      textTransform="capitalize"
                      as="span"
                    >
                      {/* {files.name} */}
                    </Text>
                  </HStack>
                ) : (
                  <HStack borderRadius="12px" border="1px solid #e4e4e4">
                    <Image
                      boxShadow=" 0 0 20px rgba(0,0,0,0.2)"
                      borderRadius="12px"
                      alt="icon"
                      src={imageSrc}
                      boxSize="150px"
                      objectFit="cover"
                    />
                  </HStack>
                )
              ) : (
                <VStack w="full" spacing="14px">
                  <Image src={imageIcon.src} alt="uplaod" />
                  <Text as="span" color="#919191" fontWeight="400" fontSize="18px">
                    Upload
                  </Text>
                </VStack>
              )}
              <Input
                onChange={handleChange}
                opacity="0"
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                type="file"
                accept="image/*"
                multiple={false}
              />
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <VStack w={'100%'}>
            <Button
              borderRadius="12px"
              bg={'#4545FE'}
              w={'100%'}
              color={'#FFFFFF'}
              fontWeight={'400'}
              fontSize={'18px'}
              lineHeight={'23px'}
              alignSelf="stretch"
              isDisabled={!isValid}
              isLoading={mutation.isLoading}
              onClick={OnClickButton}
              _hover={{
                shadow: 'sm',
              }}
              _active={{
                opacity: 0.8,
              }}
              minH={'55px'}
            >
              <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                Proceed
              </motion.button>
            </Button>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateId;
