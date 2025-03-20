import {useEffect, useState} from 'react';
import TransactionsList from './TransactionsList';
import SummaryDrawer from './Summary';
import PaymentDrawer from './payment';
import Breakdown from './Breakdown';
import { Drawer, DrawerContent, DrawerOverlay, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

const PendingTransactions = ({assetData, drawer, isError, isLoading}) => {
  const [type, setType] = useState('');
  const [asset, setAsset] = useState(null);
  const [amountToPay, setAmountToPay] = useState('');
  const [screenWidth, setScreenWidth] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    const equity = assetData?.[0]
    if (assetData?.length === 1) {
      setAsset(equity);
      if (
        equity?.type == "WHOLE" &&
        !equity?.payment_plan &&
        !equity?.co_owners?.length
      ) {
        setAmountToPay(Number(equity?.total_unit_price));
      }
      if (
        equity?.type == "WHOLE" &&
        equity?.payment_plan &&
        !equity?.co_owners?.length
      ) {
        setAmountToPay(equity?.payment_plan?.initial_deposit_in_value);
      }
      setType("summary");
    } else {
      setType("list");
    }
  }, [assetData]);

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const handleClose = () => {
    if (assetData?.length > 1) {
      setType('list');
      setAsset(null);
      setAmountToPay('');
    } else {
      setAsset(assetData?.[0])
      setType('summary')
    }
    setSelectedCard(null)
  };

  const displayTransactionSteps = (step) => {
    switch (step) {
      case "list":
        return (
          <TransactionsList
            assetData={assetData}
            drawer={drawer}
            isError={isError}
            isLoading={isLoading}
            type={type}
            setType={setType}
            asset={asset}
            setAsset={setAsset}
            customScrollbarStyles={customScrollbarStyles}
            setAmountToPay={setAmountToPay}
            amountToPay={amountToPay}
            handleClose={handleClose}
          />
        );
      case "summary":
        return (
          <SummaryDrawer
            assetData={assetData}
            drawer={drawer}
            isError={isError}
            isLoading={isLoading}
            type={type}
            setType={setType}
            asset={asset}
            setAsset={setAsset}
            customScrollbarStyles={customScrollbarStyles}
            setAmountToPay={setAmountToPay}
            amountToPay={amountToPay}
            handleClose={handleClose}
          />
        );
      default:
        return (
          <PaymentDrawer
            assetData={assetData}
            drawer={drawer}
            isError={isError}
            isLoading={isLoading}
            type={type}
            setType={setType}
            asset={asset}
            setAsset={setAsset}
            customScrollbarStyles={customScrollbarStyles}
            setAmountToPay={setAmountToPay}
            amountToPay={amountToPay}
            handleClose={handleClose}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        );
    }
  };

  return (
    <>
      {screenWidth < 768 ? (
        <Drawer
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={handleClose}
          isCentered
          onClose={drawer?.onClose}
          isOpen={drawer?.isOpen}
        >
          <DrawerOverlay />
          <DrawerContent maxW="full" w="full" h="full">
            {displayTransactionSteps(type)}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={handleClose}
          isCentered
          onClose={drawer?.onClose}
          isOpen={drawer?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW={{ base: '40rem',  lg: '48rem' }}
            minH="75rem"
            px="0"
            py="0"
            position={`fixed`}
            right={`9.3rem`}
            bottom={'calc(10vh - 4rem)'}
            h="fit-content"
            maxH='85rem'
          >
            {displayTransactionSteps(type)}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default PendingTransactions;
