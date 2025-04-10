import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Flex,
  HStack,
  Image,
  useToast,
  Button,
  RadioGroup,
  Radio,
  ModalCloseButton,
  Spinner,
  useDisclosure,
  VStack,
  Heading,
  Tooltip,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import AllocationImageGallery from '../../../pages/assets/manage/equity/allocations/Gallery';
import {useQuery, useMutation} from 'react-query';
import {
  fetchUnitAllocationImages,
  fetchUnitAllocations,
  addAllocationToEquity,
} from '../../../api/allocations';
import {BsThreeDots} from 'react-icons/bs';
import infoICon from '/src/images/icons/infoIConforAllocation.svg';
import {toastForError} from '../../../utils/toastForErrors';
import {Popup} from 'ui-lib/ui-lib.components/Popup/Popup';
import {CreateToast} from 'ui-lib/ui-lib.components/Toast/createToast';

export const SelectAllocation = ({PICK_ALLOCATION_MODAL, equity, refetch}) => {
  const toast = useToast();
  const [uploads, setUploads] = useState([]);
  const toaster = CreateToast();
  const confirmModalDisclosure = useDisclosure();
  const [allocationVal, setAllocationVal] = useState('');
  const [activeImg, setActiveImg] = useState(uploads[0]?.image_file);
  const FETCH_UNIT_ALLOCATIONS = useQuery(['fetchUnitAllocations'], () =>
    fetchUnitAllocations(equity?.unit?.id)
  );
  const FETCH_UNIT_ALLOCATION_IMAGES = useQuery(['fetchUnitAllocationImages'], () =>
    fetchUnitAllocationImages(equity?.unit?.id)
  );

  const mutation = useMutation(formData => addAllocationToEquity(formData), {
    onSuccess: async res => {
      await refetch();
      toaster(`${allocationVal} has been allocated succesfully`);
      PICK_ALLOCATION_MODAL?.onClose();
      confirmModalDisclosure?.onClose();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });

  const handleSubmitAallocations = () => {
    mutation.mutate({equity_id: equity?.id, allocation: allocationVal});
  };
  toastForError(FETCH_UNIT_ALLOCATIONS?.error, FETCH_UNIT_ALLOCATIONS?.isError, toast);
  useEffect(() => {
    FETCH_UNIT_ALLOCATION_IMAGES?.data?.data?.length > 0
      ? (setUploads(FETCH_UNIT_ALLOCATION_IMAGES?.data?.data),
        setActiveImg(FETCH_UNIT_ALLOCATION_IMAGES?.data?.data?.[0]?.image_file))
      : null;
  }, [FETCH_UNIT_ALLOCATION_IMAGES.data]);
  const ALLOCATIONS = FETCH_UNIT_ALLOCATIONS?.data?.data?.data;

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #D7D7D7',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
    },
  };

  return (
    <>
      {equity?.unit?.allocation_type === 'manual' && equity?.allocation ? (
        <HStack justify="space-between" borderBottom="1px solid #E4E4E4" pb={2}>
          <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
            Allocated unit
          </Text>

          <Center fontWeight={500} fontSize="16px" color="#0D0D0D">
            {equity?.allocation}
          </Center>
        </HStack>
      ) : equity?.unit?.allocation_type === 'auto' ? (
        <HStack justify="space-between" borderBottom="1px solid #E4E4E4" pb={2}>
          <Text color="#606060" fontWeight={400} fontSize="14px" lineHeight="18px">
            Allocated unit
          </Text>
          {equity?.allocation ? (
            <Center fontWeight={500} fontSize="16px" color="#0D0D0D">
              {equity?.allocation}
            </Center>
          ) : equity?.can_allocate == true ? (
            <Center
              cursor={'pointer'}
              onClick={ALLOCATIONS?.length ? PICK_ALLOCATION_MODAL.onOpen : null}
              borderRadius={'8px'}
              w="143px"
              h="30px"
              fontWeight={300}
              fontSize="14px"
              bg={ALLOCATIONS?.length ? '#191919' : '#606060'}
              color="#FFFFFF"
            >
              Select allocation
            </Center>
          ) : (
            <Center>
              <Tooltip
                borderRadius="3px"
                fontSize="12px"
                hasArrow
                placement="auto"
                label={` Once subscribers have made a payment equivalent to ${equity?.unit?.allocation_milestone}%
             of the total milestone amount, they will become eligible for property allocation.`}
              >
                <HStack spacing="4px">
                  <Image src={infoICon.src} alt="info icon" />
                  <Text fontWeight={500} fontSize="16px" color="#0D0D0D">
                    Not Eligible
                  </Text>
                </HStack>
              </Tooltip>
            </Center>
          )}
        </HStack>
      ) : null}
      <Modal
        isCentered
        scrollBehavior="inside"
        onClose={PICK_ALLOCATION_MODAL?.onClose}
        isOpen={PICK_ALLOCATION_MODAL.isOpen}
        autoFocus={false}
      >
        <ModalOverlay bg="rgba(0, 0, 0, 0.4)" />
        <ModalContent
          maxH="718px"
          p="24px"
          h="fit-content"
          maxW={'788.53px'}
          bg="#fff"
          boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.02)"
          borderRadius="16px"
          w="full"
        >
          <HStack position="relative" mb="18.87px">
            <Text fontSize={'20px'} fontWeight={'600'} color="#0D0D0D">
              Unit Allocation
            </Text>

            <ModalCloseButton color="#0D0D0D" />
          </HStack>
          <ModalBody sx={customScrollbarStyles} px="0" pt="0px" pb="0px" pr="3px">
            {FETCH_UNIT_ALLOCATIONS?.isLoading || FETCH_UNIT_ALLOCATION_IMAGES.isLoading ? (
              <Center h="50vh">
                <Spinner color="#0D0D0D" />
              </Center>
            ) : FETCH_UNIT_ALLOCATIONS?.isError ? (
              <Center h="50vh">
                <Text fontSize="14px" color="#0D0D0D" fontWeight="400" textAlign="'center">
                  Oops something went wrong fetching allocations,please try again later.
                </Text>
              </Center>
            ) : (
              <Stack spacing={'none'}>
                <AllocationImageGallery
                  activeImg={activeImg}
                  uploads={uploads}
                  setActiveImg={setActiveImg}
                />

                {ALLOCATIONS?.length ? (
                  <RadioGroup mb="32.57px" onChange={setAllocationVal} value={allocationVal}>
                    <Heading fontFamily='Euclid Circular B' mb="8px" fontSize="16px" color="#0D0D0D" fontWeight="500">
                      Select a unit
                    </Heading>
                    <Flex
                      gap="26.101px"
                      rowGap="10px"
                      justifyContent="start"
                      wrap="wrap"
                      w="full"
                      sx={customScrollbarStyles}
                      overflowY="auto"
                      maxH="100px"
                    >
                      {ALLOCATIONS?.map((allocation, index) => (
                        <Radio
                          key={index}
                          isDisabled={allocation.allocated}
                          value={allocation?.name}
                          hidden
                        >
                          <Tooltip
                            borderRadius="3px"
                            fontSize="12px"
                            hasArrow
                            isDisabled={!allocation.allocated}
                            placement="auto"
                            label="This unit has been allocated"
                          >
                            <HStack
                              cursor={allocation.allocated ? 'not-allowed' : 'pointer'}
                              bg={allocationVal == allocation?.name ? '#0D0D0D' : '#D7D7D7'}
                              borderRadius="18.27px"
                              justify="center"
                              p="9.14px 11.7px"
                              maxH="33.27px"
                              minW="54.5px"
                            >
                              <Text
                                fontSize="12px"
                                color={allocationVal == allocation?.name ? '#fff' : '#0D0D0D'}
                                fontweight="500"
                              >
                                {allocation?.name}
                              </Text>
                            </HStack>
                          </Tooltip>
                        </Radio>
                      ))}
                    </Flex>
                  </RadioGroup>
                ) : (
                  <Center h="50vh">
                    <Text fontSize="14px" color="#000000" fontWeight="400" textAlign="'center">
                      No Allocation has been created for this unit.
                    </Text>
                  </Center>
                )}
                {ALLOCATIONS?.length ? (
                  <HStack w="full" justify="flex-end" pt="0px" pb="0px">
                    <Button
                      h="44px"
                      w="150px"
                      bg="#0D0D0D"
                      color="#fff"
                      borderRadius="5px"
                      isDisabled={!allocationVal}
                      onClick={confirmModalDisclosure.onOpen}
                      _hover={{
                        opacity: '1',
                      }}
                    >
                      {'Proceed'}
                    </Button>
                  </HStack>
                ) : null}
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Popup
        maxW="638px"
        minH="431px"
        darkMode
        isOpen={confirmModalDisclosure.isOpen}
        onClose={confirmModalDisclosure.onClose}
        px="0px"
        py="0px"
      >
        <Popup.Body p="0">
          <VStack spacing="43px" justify="start" px="41px" pr="34px" h="full" w="full">
            <Text fontSize="32px" mt="138px" fontWeight="600" color="#fff">
              Are you sure you want {allocationVal}?
            </Text>
            <HStack w="full" spacing="20px">
              <Button
                w="241px"
                h="60px"
                _hover={{
                  opacity: '1',
                }}
                bg="#fff"
                borderRadius="5px"
                color="#D92E33"
                fontSize="18px"
                fontWeeight="400"
                onClick={confirmModalDisclosure.onClose}
              >
                No, go back
              </Button>
              <Button
                w="302px"
                h="60px"
                _hover={{
                  opacity: '1',
                }}
                bg="#fff"
                borderRadius="5px"
                color="#191919"
                fontSize="18px"
                fontWeight="400"
                onClick={handleSubmitAallocations}
              >
                {mutation.isLoading ? <BsThreeDots /> : 'Yes'}
              </Button>
            </HStack>
          </VStack>
        </Popup.Body>
      </Popup>
    </>
  );
};

export default SelectAllocation;
