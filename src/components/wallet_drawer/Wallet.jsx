import React, {useState} from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useMediaQuery,
  ModalOverlay,
  ModalContent,
  Modal,
} from '@chakra-ui/react';
import WalletContent from './wallet_content';
import DepositWallet from './deposit';
import WithdrawalWallet from './withdrawal';

export const Wallet = ({isWalOpen, onWalClose, avatar, onDrawerOpen}) => {
  const [page, setPage] = useState('wallet');
  const [isBelowMd] = useMediaQuery('(max-width:767px)');

  return (
    <>
      {isBelowMd ? (
        <Drawer
          onCloseComplete={() => setPage('wallet')}
          blockScrollOnMount={true}
          isOpen={isWalOpen}
          onClose={onWalClose}
          placement="right"
          autoFocus={false}
          trapFocus={false}
        >
          <DrawerContent
            maxW="full"
            p="0 !important"
            bg="card_bg"
            bottom={'0 !important'}
            right={{base: '0', lg: '24px !important'}}
            w="full"
            h={'full'}
            maxH='full'
            top='unset !important'
            
          >
            {page === 'wallet' && (
              <WalletContent
                avatar={avatar}
                setPage={setPage}
                onWalClose={onWalClose}
                onDrawerOpen={onDrawerOpen}
              />
            )}
            {page === 'deposit' && <DepositWallet setPage={setPage} onWalClose={onWalClose} />}
            {page === 'withdrawal' && (
              <WithdrawalWallet setPage={setPage} onWalClose={onWalClose} />
            )}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          onCloseComplete={() => setPage('wallet')}
          blockScrollOnMount={true}
          isOpen={isWalOpen}
          onClose={onWalClose}
          placement="right"
          autoFocus={false}
          trapFocus={false}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW={{ base: '40rem',  lg: '48rem' }}
            minH={"75rem"}
            px="0"
            py="0"
            position={`fixed`}
            right={`9.3rem`}
            bottom={'calc(10vh - 7.5rem)'}
            h="fit-content"
            maxH='75rem'
          >
            {page === 'wallet' && (
              <WalletContent
                avatar={avatar}
                setPage={setPage}
                onWalClose={onWalClose}
                onDrawerOpen={onDrawerOpen}
              />
            )}
            {page === 'deposit' && <DepositWallet setPage={setPage} onWalClose={onWalClose} />}
            {page === 'withdrawal' && (
              <WithdrawalWallet
                setPage={setPage}
                onWalClose={onWalClose}
              />
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Wallet;
