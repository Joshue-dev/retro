import {HStack, Text, useDisclosure} from '@chakra-ui/react';
import BuyModal from './buyModal';
import {Button} from '../../../ui-lib';
import buyProperty from '../../../images/icons/buyProperty.svg';

const BuyProperties = ({unitData}) => {
  const buyModal = useDisclosure();

  return (
    <>
      <Button
        bg="primary"
        color="white"
        width={{base: 'full', lg: '255px'}}
        h="56px"
        leftIcon={<img src={buyProperty.src} size={25} />}
        onClick={buyModal.onOpen}
      >
        <HStack>
          <Text fontSize={'16px'} fontWeight={'500'}>
            Proceed to Payment
          </Text>
        </HStack>
      </Button>

      <BuyModal unitData={unitData} buyModal={buyModal} />
    </>
  );
};

export default BuyProperties;
