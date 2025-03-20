import React from 'react';
import docIcon from '/src/images/icons/doc_settings_icon.svg';
import {HiOutlinePlus} from 'react-icons/hi';
import {Box, HStack, Image, Text, useDisclosure, VStack} from '@chakra-ui/react';
import UpdateId from './UpdateId';
import {changeDateFormat} from '../../../utils/formatDate';

const DocumentUpdate = ({refetch, DocData}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const docstDetails = DocData?.details && DocData?.details[0];

  return (
    <VStack mt={'20px'}>
      <Text alignSelf={'start'} fontWeight={'600'} fontSize={'18px'} lineHeight={'23px'}>
        Valid Id
      </Text>
      <HStack
        px="26px"
        w="full"
        py="23px"
        mb="14px"
        maxW="100%"
        boxShadow="base"
        background="#FFFFFF"
        border="1px solid #F4F4F4"
        borderRadius={'16px'}
        spacing={5}
      >
        <Image src={docIcon.src} alt="doc icon" />

        <VStack width={'100%'} alignItems={'start'}>
          {docstDetails && (
            <Text
              fontWeight="700"
              fontSize="20px"
              lineHeight="23px"
              textTransform="capitalize"
              color="#191919"
            >
              {docstDetails?.document_type === 'National Identity Card'
                ? 'National ID'
                : docstDetails?.document_type?.toLowerCase()}
            </Text>
          )}
          {docstDetails && (
            <Box textAlign={'start'}>
              <Text fontWeight="400" fontSize="14px" lineHeight="18px" color="#606060">
                Issued{' '}
                <Text as="span" fontWeight="600" color="#606060">
                  {docstDetails?.issue_date && changeDateFormat(docstDetails?.issue_date)}.
                </Text>{' '}
                Expiration Date{' '}
                <Text as="span" fontWeight="600" color="#606060">
                  {docstDetails?.exp_date && changeDateFormat(docstDetails?.exp_date)}
                </Text>
              </Text>
            </Box>
          )}
        </VStack>
        <UpdateId refetch={refetch} isOpen={isOpen} onClose={onClose} />
      </HStack>
    </VStack>
  );
};

export default DocumentUpdate;
