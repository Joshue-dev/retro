import {Flex, Image, HStack, Text, VStack} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import emptyIcon from '/src/images/icons/emptyIcon.svg';
import rightArrow from '/src/images/icons/right_arrow_agents_account.svg';
import rightArrowActive from '/src/images/icons/right_arrow_agents_account_active.svg';
import {changeDateFormat} from '../../../utils/formatDate';
import HoverOnAccountAmount from './HoverOnAccountAmount';
import {generateID} from 'utils/generateId';

export const AccountTransactionDetails = ({payouts, recentTransactions, upcomingPayment}) => {
  const router = useRouter();

  return (
    <HStack h="fit-content" w="full" my="6" pb="8">
      <VStack
        spacing={7}
        p={6}
        minH="157px"
        w="full"
        bg="#FFFFFF"
        boxShadow="0px 4px 18px rgba(0, 0, 0, 0.04)"
        borderRadius="16px"
        alignSelf="stretch"
        className="flex flex-col items-start justify-start cols-span-1"
      >
        <HStack
          w="full"
          justify="space-between"
          align="center"
          className="flex flex-row items-center justify-between w-full"
        >
          <div className="font-bold ">Payout</div>
          {
            <HStack spacing="2px">
              <Text
                fontSize="12px"
                fontWeight={500}
                onClick={() => (!payouts?.length == 0 ? router.push('account/payout') : '')}
                cursor={!payouts?.length == 0 ? 'pointer' : 'none'}
                color={!payouts?.length == 0 ? '#4545FE' : '#24252633'}
              >
                View all
              </Text>
              <Image
                alt="rightIcon"
                src={!payouts?.length == 0 ? rightArrowActive.src : rightArrow.src}
              />
            </HStack>
          }
        </HStack>

        {!payouts?.length ? (
          <VStack spacing="8px" mx="auto" w="full" h="full" py="70px">
            <Image w="40px" h="40px" alt="emptystateIcon" src={emptyIcon.src} />
            <Text fontSize="20px" fontWeight="700">
              Nothing Found
            </Text>
            <Text w="full" textAlign="center" fontSize="14px" fontWeight={400} mx="auto">
              No transaction yet
            </Text>
          </VStack>
        ) : (
          payouts?.slice(0, 5)?.map((item, index) => (
            <HStack
              key={generateID()}
              w="full"
              justify="space-between"
              mt="3"
              align="center"
              className="flex flex-row items-center justify-between w-full mt-3"
            >
              <HoverOnAccountAmount text={item.amount} Textcolor="#FF3636" />

              <Text
                fontSize="14px"
                textTransform="capitalize"
                fontWeight={400}
                whiteSpace="break-spaces"
                w="120px"
                textAlign="start"
              >
                {item?.bank_name || '-'}
              </Text>

              <Text minW="60px" fontSize="16px" fontWeight="400" color="#191919" textAlign="end">
                {item?.created_at ? changeDateFormat(item?.created_at, 'm/d') : ''}
              </Text>
            </HStack>
          ))
        )}
      </VStack>
      <VStack
        spacing={6}
        p={6}
        minH="401px"
        bg="#FFFFFF"
        w="full"
        alignSelf="stretch"
        boxShadow="0px 4px 18px rgba(0, 0, 0, 0.04)"
        borderRadius="16px"
        className="flex flex-col items-center justify-start cols-span-1"
      >
        <HStack
          w="full"
          justify="space-between"
          align="center"
          className="flex flex-row items-center justify-between w-full textsm"
        >
          <div className="font-bold ">Recent transactions</div>
          <HStack spacing="2px">
            <Text
              fontSize="12px"
              fontWeight={500}
              onClick={() =>
                !recentTransactions?.length == 0 ? router.push('account/recent_transactions') : ''
              }
              cursor={!recentTransactions?.length == 0 ? 'pointer' : 'none'}
              color={!recentTransactions?.length == 0 ? '#4545FE' : '#24252633'}
            >
              View all
            </Text>
            <Image
              alt="rightIcon"
              src={!recentTransactions?.length == 0 ? rightArrowActive.src : rightArrow.src}
            />
          </HStack>
        </HStack>
        {!recentTransactions?.length ? (
          <VStack spacing="8px" mx="auto" w="full" h="full" py="70px">
            <Image w="40px" h="40px" alt="emptystateIcon" src={emptyIcon.src} />
            <Text fontSize="20px" fontWeight="700">
              Nothing Found
            </Text>
            <Text w="full" textAlign="center" fontSize="14px" fontWeight={400} mx="auto">
              No transaction yet
            </Text>
          </VStack>
        ) : (
          recentTransactions?.slice(0, 5)?.map((item, index) => (
            <HStack
              key={generateID()}
              w="full"
              justify="space-between"
              mt="3"
              align="center"
              className="flex flex-row items-center justify-between w-full mt-3"
            >
              <Flex gap="5px" align="center">
                <Image
                  w="40px"
                  h="40px"
                  alt="user image"
                  className="rounded-full"
                  src={item?.customer?.avatar}
                />
                <Text
                  fontSize="14px"
                  textTransform="capitalize"
                  fontWeight={400}
                  whiteSpace="break-spaces"
                  w="109px"
                  textAlign="start"
                >
                  {`${item?.customer?.first_name} ${item?.customer?.last_name}`}
                </Text>
              </Flex>

              <HoverOnAccountAmount text={item?.amount_paid} Textcolor="#12D8A0" />
              <Text minW="60px" fontSize="16px" fontWeight="400" color="#191919" textAlign="end">
                {item?.created_at ? changeDateFormat(item?.created_at, 'm/d') : ''}
              </Text>
            </HStack>
          ))
        )}
      </VStack>
      <VStack
        spacing={6}
        p={6}
        minH="157px"
        bg="#FFFFFF"
        w="full"
        alignSelf="stretch"
        boxShadow="0px 4px 18px rgba(0, 0, 0, 0.04)"
        borderRadius="16px"
        className="flex flex-col items-center justify-start cols-span-1"
      >
        <HStack
          w="full"
          justify="space-between"
          align="center"
          className="flex flex-row items-center justify-between w-full textsm"
        >
          <div className="font-bold ">Upcoming Payments</div>
          <HStack spacing="2px">
            <Text
              fontSize="12px"
              fontWeight={500}
              onClick={() =>
                !upcomingPayment?.length == 0 ? router.push('account/upcomingPayments') : ''
              }
              cursor={!upcomingPayment?.length == 0 ? 'pointer' : 'none'}
              color={!upcomingPayment?.length == 0 ? '#4545FE' : '#24252633'}
            >
              View all
            </Text>
            <Image
              alt="rightIcon"
              src={!upcomingPayment?.length == 0 ? rightArrowActive.src : rightArrow.src}
            />
          </HStack>
        </HStack>
        {!upcomingPayment ? (
          <VStack spacing="8px" mx="auto" w="full" h="full" py="70px">
            <Image w="40px" h="40px" alt="emptystateIcon" src={emptyIcon.src} />
            <Text fontSize="20px" fontWeight="700">
              Nothing Found
            </Text>
            <Text w="full" textAlign="center" fontSize="14px" fontWeight={400} mx="auto">
              No transaction yet
            </Text>
          </VStack>
        ) : (
          upcomingPayment?.slice(0, 5)?.map((item, index) => (
            <HStack
              key={generateID()}
              w="full"
              justify="space-between"
              mt="3"
              align="center"
              className="flex flex-row items-center justify-between w-full mt-3"
            >
              <Flex gap="15px" align="center">
                <Image
                  w="40px"
                  h="40px"
                  alt="user image"
                  className="rounded-full"
                  src={item?.owner?.avatar}
                />
                <Text
                  fontSize="14px"
                  textTransform="capitalize"
                  fontWeight={400}
                  whiteSpace="break-spaces"
                  w="109px"
                  textAlign="start"
                >
                  {`${item?.owner?.first_name} ${item?.owner?.last_name}`}
                </Text>
              </Flex>

              <HoverOnAccountAmount text={item.amount} Textcolor="#12D8A0" />
              <Text minW="60px" fontSize="16px" fontWeight="400" color="#191919" textAlign="end">
                {item ? changeDateFormat(item?.created_at, 'm/d') : ''}
              </Text>
            </HStack>
          ))
        )}
      </VStack>

      {/* </div> */}
    </HStack>
  );
};

export default AccountTransactionDetails;
