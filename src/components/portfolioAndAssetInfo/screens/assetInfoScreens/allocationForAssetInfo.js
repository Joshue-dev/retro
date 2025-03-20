import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {toastForError} from '../../../../utils/toastForErrors';
import {addAllocationToEquity, fetchUnitAllocationImages, fetchUnitAllocations} from '../../../../api/allocations';
import {
  HStack,
  Text,
  Input,
  useDisclosure,
  useMediaQuery,
  useToast,
  Center,
  Image,
  Tooltip,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useTheme,
} from '@chakra-ui/react';
import SelectAllocationForAssetsInfo from '../../components/allocation/selectAllocationForAssetsInfo';
import infoICon from '/src/images/icons/infoIConforAllocation.svg';
import ConfirmSelectedAllocation from '../../components/allocation/confirmSelectedAllocation';
import isMobile from 'utils/extras';
import { useToastForRequest } from 'ui-lib/ui-lib.hooks/useToast';
import { useLightenHex } from 'utils/lightenColorShade';

const AllocationForAssetInfo = ({refetch, drawerDisClosure, equity, handleParentScreen, onClose}) => {
  const toast = useToastForRequest();
  const defaultScrn = 'select allocation';
  const [screen, setScreen] = useState(defaultScrn);
  const [allocationVal, setAllocationVal] = useState('');

  const [uploads, setUploads] = useState([]);

  const FETCH_UNIT_ALLOCATIONS = useQuery(
    ['fetchUnitAllocations'],
    () => fetchUnitAllocations(equity?.unit?.id),
    {
      enabled: !!equity?.unit?.id,
    }
  );

  const FETCH_UNIT_ALLOCATION_IMAGES = useQuery(
    ['fetchUnitAllocationImages'],
    () => fetchUnitAllocationImages(equity?.unit?.id),
    {
      enabled: !!equity?.unit?.id,
    }
  );
  toastForError(FETCH_UNIT_ALLOCATIONS?.error, FETCH_UNIT_ALLOCATIONS?.isError, toast);

  useEffect(() => {
    FETCH_UNIT_ALLOCATION_IMAGES?.data?.data?.length > 0
      ? setUploads(FETCH_UNIT_ALLOCATION_IMAGES?.data?.data)
      : null;
  }, [FETCH_UNIT_ALLOCATION_IMAGES.data]);

  const ALLOCATIONS = FETCH_UNIT_ALLOCATIONS?.data?.data?.data;

  const mutation = useMutation(formData => addAllocationToEquity(formData), {
    onSuccess: async res => {
      refetch();
      handleParentScreen('asset info');
      toast({
        title: 'Congratulations',
        description: `You have been assigned ${allocationVal}, ${equity?.unit?.unit_title}, ${equity?.project?.name}`,
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError: err => {
      toastForError(err, true, toast);
    },
  });
  const handleSubmitAllocation = () => {
    mutation.mutate({equity_id: equity?.id, allocation: allocationVal});
  };
  const handleScreen = scrn => () => {
    return setScreen(scrn);
  };

  const handleClose = () => {
    setScreen(defaultScrn);
    return onClose();
  };

  const displayAllocationScreens = scrn => {
    switch (scrn) {
      case 'select allocation':
        return (
          <SelectAllocationForAssetsInfo
            ALLOCATIONS={ALLOCATIONS}
            FETCH_UNIT_ALLOCATION_IMAGES={FETCH_UNIT_ALLOCATION_IMAGES}
            FETCH_UNIT_ALLOCATIONS={FETCH_UNIT_ALLOCATIONS}
            setAllocationVal={setAllocationVal}
            allocationVal={allocationVal}
            uploads={uploads}
            drawerDisClosure={drawerDisClosure}
            handleClose={handleClose}
            handleScreen={handleScreen}
            handleParentScreen={handleParentScreen}
          />
        );
      case 'confirm selection':
        return (
          <ConfirmSelectedAllocation
            allocationVal={allocationVal}
            handleSubmitAllocation={handleSubmitAllocation}
            mutation={mutation}
            handleScreen={handleScreen}
          />
        );
      default:
        return (
          <SelectAllocationForAssetsInfo
            ALLOCATIONS={ALLOCATIONS}
            FETCH_UNIT_ALLOCATIONS={FETCH_UNIT_ALLOCATIONS}
            FETCH_UNIT_ALLOCATION_IMAGES={FETCH_UNIT_ALLOCATION_IMAGES}
            setAllocationVal={setAllocationVal}
            allocationVal={allocationVal}
            uploads={uploads}
            handleClose={handleClose}
            handleScreen={handleScreen}
            handleParentScreen={handleParentScreen}
          />
        );
    }
  };
  return <>{displayAllocationScreens(screen)}</>;
};

export default AllocationForAssetInfo;

export const HandleAllocation = ({equity, refetch, handleScreen}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary
  const { lightenHex } = useLightenHex(primaryColor);
  const drawerDisClosure = useDisclosure();

  const FETCH_UNIT_ALLOCATIONS = useQuery(
    ['fetchUnitAllocations'],
    () => fetchUnitAllocations(equity?.unit?.id),
    {
      enabled: !!equity?.unit?.id,
    }
  );
  const ALLOCATIONS = FETCH_UNIT_ALLOCATIONS?.data?.data?.data;
  const [isBelowMd] = useMediaQuery('(max-width:540px)');

  const openAllocation = () => {
    const navigateToAllocation = handleScreen('allocation');
    return isBelowMd ? drawerDisClosure.onOpen() : navigateToAllocation();
  };

  return (
    <>
      {equity?.unit?.allocation_type === 'manual' && equity?.allocation ? (
        <Center
          fontSize={{base: ' 12.536px', md: '16px'}}
          lineHeight={{base: '14px', md: '16px'}}
          fontWeight="600"
          color="matador_text.200"
        >
          {equity?.allocation}
        </Center>
      ) : equity?.unit?.allocation_type === 'auto' ? (
        equity?.allocation ? (
          <Center
            fontSize={{base: ' 12.536px', md: '16px'}}
            lineHeight={{base: '14px', md: '16px'}}
            fontWeight="600"
            color="matador_text.200"
          >
            {equity?.allocation}
          </Center>
        ) : equity?.can_allocate ? (
          <HStack
            align={'center'}
            cursor='pointer'
            justify="center"
            opacity={ALLOCATIONS?.length ? 1 : 0.4}
            onClick={ALLOCATIONS?.length ? openAllocation : null}
          >
            <Text
              fontSize={{base: '12.824px', md: '14px'}}
              color={theme.theme_name !== 'light' ? lightenHex(55) : "primary"}
              fontFamily="Open Sans"
              fontWeight={400}
            >
              Select Allocation
            </Text>
          </HStack>
        ) : (
          <Center>
            <HStack spacing="4px">
              <Text
                fontSize={{base: ' 12.536px', md: '16px'}}
                lineHeight={{base: '14px', md: '16px'}}
                fontWeight="600"
                color="matador_text.200"
              >
                Eligible at {equity?.unit?.allocation_milestone ?? '-'}%
              </Text>
            </HStack>
          </Center>
        )
      ) : (
        <Text
          fontSize={{base: ' 12.536px', md: '16px'}}
          lineHeight={{base: '14px', md: '16px'}}
          fontWeight="600"
          color="matador_text.200"
        >
          Not allocated yet
        </Text>
      )}

      <Drawer
        isOpen={drawerDisClosure.isOpen}
        onClose={drawerDisClosure.onClose}
        placement={isMobile ? 'bottom' : 'right'}
        autofocus={false}
      >
        <DrawerOverlay />
        <DrawerContent bg='card_bg' h='fit-content' roundedTop='16px' maxH='741px' p="0px" maxW="fit-content">
          <AllocationForAssetInfo
            refetch={refetch}
            equity={equity}
            drawerDisClosure={drawerDisClosure}
            handleParentScreen={handleScreen}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};
