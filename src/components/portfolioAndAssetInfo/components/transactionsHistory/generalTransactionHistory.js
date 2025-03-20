import {HStack, Stack, StackDivider, Text, useTheme, useToast} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {changeDateFormat} from '../../../../utils/formatDate';
import {formatToCurrency} from '../../../../utils';
import {useMutation} from 'react-query';
import {toastForError} from '../../../../utils/toastForErrors';
import {fetchPurchaseHistory} from '../../../../api/payment';
import StaggeredSkeleton from '../../../tables/assetTableSkeleton';
import { useToastForRequest } from 'ui-lib/ui-lib.hooks/useToast';
import EmptyState from '@/components/appState/empty-state';

const GeneralTransactionHistory = ({info}) => {
  const theme = useTheme()
  const toast = useToastForRequest();
  const TRANSACTIONS_HISTORY = useMutation(() => fetchPurchaseHistory(info?.id), {
    onError: err => {
      toastForError(err, true, toast);
    },
    mutationKey: ['transaction_history', info?.id],
    retry: 0,
  });

  useEffect(() => {
    if (info?.id) {
      TRANSACTIONS_HISTORY?.mutate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const arrayData = TRANSACTIONS_HISTORY?.data?.data ?? [];

  return (
    <Stack zIndex={1} w="full" spacing={{base: '2.33px', md: '4px'}}>
      <Text
        position="sticky"
        top="-1px"
        zIndex={1}
        backdropFilter="blur(3px)"
        as="h2"
        fontSize={{base: '14.326px', md: '16px'}}
        lineHeight="39px"
        fontWeight="700"
        fontFamily="Open Sans"
        color="matador_text.500"
      >
        TRANSACTION HISTORY
      </Text>
      <StaggeredSkeleton isLoading={TRANSACTIONS_HISTORY.isLoading}>
        {arrayData?.length > 0 ? (
          <Stack
            p={{
              base: '10.383px 27.687px 10.383px 20.765px',
              md: '11.596px 30.921px 11.596px 23.191px',
            }}
            border="1.288px solid"
            borderColor={theme.theme_name !== "light"
              ? "matador_border_color.200"
              : "matador_border_color.100"}
            spacing="none"
            divider={
              <StackDivider
                mb={{base: '10.38px', md: '11.6px'}}
                border="none"
                h="0.8px"
                bg={theme.theme_name !== "light"
                  ? "matador_border_color.200"
                  : "matador_border_color.100"}
              />
            }
            w="full"
            bg={theme.theme_name !== 'light' ? "matador_background.100" : "card_bg"}
          >
            {arrayData.map((info, idx) => (
              <HStack py={{base: '9.85px', md: '11px'}} key={idx} justify="space-between" w="full">
                <Text
                  fontSize={{base: '12px', md: '14px'}}
                  fontFamily="Open Sans"
                  lineHeight={{base: '17px', md: '19px'}}
                  fontWeight="400"
                  color="matador_text.500"
                >
                  {changeDateFormat(info?.created_at ?? '')}
                </Text>

                <Text
                  fontSize={{base: ' 12.536px', md: '16px'}}
                  lineHeight={{base: '14px', md: '16px'}}
                  fontWeight="600"
                  color="matador_text.200"
                >
                  {formatToCurrency(info?.amount ?? '')}
                </Text>
              </HStack>
            ))}
          </Stack>
        ) : <EmptyState h='100px' fontSize='14px' icon text='No transactions yet' />}
      </StaggeredSkeleton>
    </Stack>
  );
};

export default GeneralTransactionHistory;
