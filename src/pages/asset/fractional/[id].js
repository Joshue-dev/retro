import React, {useState} from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  SimpleGrid,
  useDisclosure,
  GridItem,
  Center,
  Divider,
  HStack,
  Hide,
  useMediaQuery,
  Button,
} from '@chakra-ui/react';

import {LayoutView} from '../../../components/page_layout';
import homeOwner from '../../../images/home-owner.svg';
import homeOwnerLight from '../../../images/home-owner-light.svg';
import giveFeedback from '../../../images/give-feedback.svg';
import giveFeedbackLight from '../../../images/give-feedback-light.svg';
import {useQuery} from 'react-query';
import {fetchEquity, fetchFractionalInfo} from '../../../api/listing';
import {useRouter} from 'next/router';

import HomeOwnersPacket from '../sections/HomeOwnersPacket';
import ErrorState from '../../../components/appState/error-state';

import Auth from '../../../hoc/Auth';

import PurchaseFeedback from '../../../components/purchaseFeedback';

import {appCurrentTheme} from '../../../utils/localStorage';
import {LIGHT} from '../../../constants/names';
import AssetHeader from '../../../components/manageAssets/components/assetHeader';
import AssetWrapper from '../../../components/manageAssets/components/layoutWrapper/assetWrapper';
import AssetInfoWrapper from '../../../components/manageAssets/components/layoutWrapper/assetInfoWrapper';
import AssetOverviewWrapper from '../../../components/manageAssets/components/layoutWrapper/assetOverviewWrapper';
import FractionalTransactionInfo from '../../../components/manageAssets/fractionalTransactionInfo';
import {Spinner} from '../../../ui-lib';
import HoverText from '../../../ui-lib/ui-lib.components/hover/hoverOnText';
import {formatToCurrency} from '../../../utils';

const absoluteStyle = {
  top: '20vh',
};

const FractionalAsset = () => {
  const {query} = useRouter();
  const [displayTab, setDisplayTab] = useState('transaction');

  const recurringModal = useDisclosure();

  const homeOwnersPacketModal = useDisclosure();
  const {data, isLoading, isError, refetch} = useQuery(
    ['fetchUserEquity', query?.id],
    () => fetchEquity(query?.id),
    {enabled: !!query?.id}
  );
  const info = data?.data;
  const feedModal = useDisclosure();

  const handleDisplaySwitch = prop => () => setDisplayTab(prop);

  const {data: fractionalDetail} = useQuery(
    ['fractional', info?.unit?.id],
    () => fetchFractionalInfo(info?.unit?.id),
    {enabled: !!info?.unit?.id}
  );

  console.log({fractionalDetail, info});

  const stackHolders = fractionalDetail?.data?.partners;
  const dividendObj = fractionalDetail?.data?.extra_info;

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
      height: '4px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px #fff',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#cbcbcb',
    },
  };

  const OVERVIEWINFO = [
    {
      label: 'Fractional Value',
      component: (
        <Text
          fontSize={{base: '12px', md: '13.664px'}}
          lineHeight={{base: '14px', md: '17px'}}
          fontWeight="600"
          color="#191919"
        >
          {info?.fractional_equity_value ? formatToCurrency(info?.fractional_equity_value) : '-'}
        </Text>
      ),
    },
    {label: 'No of Fraction', value: info?.amount_of_fractions ?? '-'},
    {
      label: 'Land Title',
      value: info?.project?.land_title ?? '-',
    },
    {
      label: 'Development Stage',
      value: info?.project?.status ?? '-',
    },
    {
      label: 'Unit size',
      value: `${info?.project?.land_size ?? '-'} sqm`,
    },

    {label: 'Unit type', value: info?.project?.building_type ?? '-'},
    ...(info?.allocation
      ? [
          {
            label: 'Allocation',
            value: info?.allocation ? info.allocation : 'Not Allocated',
          },
        ]
      : []),
    {label: 'Holding Period', value: info?.unit?.holding_period ?? '-'},
  ];
  const navBarStyle = {
    desktop: {
      display: {base: 'none', xl: 'flex'},
    },
    mobile: {
      display: 'none',
    },
  };

  return (
    <>
      <LayoutView spacing="0px" navBarStyle={navBarStyle} noPadding>
        <AssetWrapper>
          {isError ? (
            <ErrorState />
          ) : isLoading || !info ? (
            <Spinner absoluteStyle={absoluteStyle} />
          ) : (
            <>
              <AssetHeader
                listingName={info?.project?.name ?? '-'}
                unitName={info?.unit?.unit_title ?? '-'}
                bgImg={info?.project?.photos?.[0]?.photo}
              />

              <AssetInfoWrapper
                maxW="1305px"
                spacing="31.3px"
                pt={{base: '0px', xl: '42.75px'}}
                displayTab={displayTab}
                handleDisplaySwitch={handleDisplaySwitch}
              >
                <AssetOverviewWrapper
                  overviewInfo={OVERVIEWINFO}
                  maxH={{base: 'full', xl: 'fit-content'}}
                  maxW={{base: 'full', xl: '646.13px'}}
                  w={{base: 'full', xl: 'full'}}
                  display={{
                    base: displayTab === 'overview' ? 'block' : 'none',
                    xl: 'block',
                  }}
                >
                  {stackHolders?.length ? (
                    <Flex
                      overflowX={{base: 'none', xl: 'auto'}}
                      flexWrap={{base: 'wrap', xl: 'nowrap'}}
                      align="center"
                      gap={{xl: '9px', base: '8.77px'}}
                      justify="start"
                      minH="64px"
                      sx={customScrollbarStyles}
                    >
                      {stackHolders?.map((item, idx) => (
                        <VStack
                          key={idx}
                          borderRadius="3.75px"
                          border=" 0.75px solid #E4E4E4"
                          px="10px"
                          w={{base: '48.5%', xl: '190px'}}
                          minW={{base: '48.5%', xl: '190px'}}
                          maxH="60px"
                          maxW="fit-content"
                          justify="center"
                          spacing="6px"
                          minH="60px"
                        >
                          <HoverText
                            lens={[30, 30]}
                            fontSize={{xl: '9px', base: '9px'}}
                            fontWeight="400"
                            color="matador_text.500"
                            textTransform="capitalize"
                            text={item?.stakeholder_type ?? '-'}
                          />

                          <HoverText
                            fontSize={{xl: '12.5px', base: '12.5px'}}
                            fontWeight="400"
                            textAlign="center"
                            textTransform="capitalize"
                            color="#2F2F2F"
                            text={item?.stakeholder_name ?? '-'}
                            lens={[21, 30]}
                          />
                        </VStack>
                      ))}
                    </Flex>
                  ) : null}
                  {stackHolders?.length ? <Divider border="none" h="0.95px" bg="#E4E4E4" /> : null}

                  {/* <HStack w="full" justify="space-between">
                    <VStack
                      borderRadius="3.75px"
                      border=" 0.75px solid #E4E4E4"
                      w="full"
                      justify="center"
                      spacing="6px"
                      h="43px"
                    ></VStack>
                    <VStack
                      borderRadius="3.75px"
                      border=" 0.75px solid #E4E4E4"
                      w="full"
                      justify="center"
                      spacing="6px"
                      h="43px"
                    ></VStack>
                  </HStack> */}
                  <Flex gap={{base: '16px', xl: '15.2px'}}>
                    <Button
                      w="50%"
                      className="inter-semibold"
                      _hover={{
                        bg: 'transparent',
                      }}
                      _focus={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      _active={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      borderRadius="0"
                      borderColor="#C3C3C3"
                      border={{base: '0.648px solid #C3C3C3', xl: '0.95px solid #C3C3C3'}}
                      fontSize={{base: '9.5px', sm: '12px', md: '13.197px'}}
                      onClick={homeOwnersPacketModal.onOpen}
                      color="matador_text.500"
                      h={{base: '48px', xl: '41.79px'}}
                      fontWeight="400"
                      bg="transparent"
                      iconSpacing={{base: '10.68px', xl: '15.2px'}}
                      leftIcon={
                        <Image
                          alt="next_image"
                          boxSize={{base: '16px', xl: '22.795px'}}
                          src={appCurrentTheme === LIGHT ? homeOwner.src : homeOwnerLight.src}
                        />
                      }
                    >
                      Investor&apos;s packet
                    </Button>
                    <Button
                      w="50%"
                      className="inter-semibold"
                      _hover={{
                        bg: 'transparent',
                      }}
                      _focus={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      _active={{
                        bg: 'transparent',
                        border: {
                          base: '0.648px solid #C3C3C3 !important',
                          xl: '0.95px solid #C3C3C3 !important',
                        },
                      }}
                      borderRadius="0"
                      borderColor="#C3C3C3"
                      border={{base: '0.648px solid #C3C3C3', xl: '0.95px solid #C3C3C3'}}
                      fontSize={{base: '9.5px', sm: '12px', md: '13.197px'}}
                      onClick={feedModal.onOpen}
                      color="matador_text.500"
                      fontWeight="400"
                      h={{base: '48px', xl: '41.79px'}}
                      bg="transparent"
                      leftIcon={
                        <Image
                          alt="next_image"
                          boxSize={{base: '16px', xl: '22.795px'}}
                          src={appCurrentTheme === LIGHT ? giveFeedback.src : giveFeedbackLight.src}
                        />
                      }
                    >
                      Give Feedback
                    </Button>
                  </Flex>
                </AssetOverviewWrapper>

                <FractionalTransactionInfo displayTab={displayTab} dividendObj={dividendObj} />
              </AssetInfoWrapper>

              <HomeOwnersPacket equityId={info?.id} modal={homeOwnersPacketModal} />
              <PurchaseFeedback equity={info} feedModal={feedModal} />
            </>
          )}
        </AssetWrapper>
      </LayoutView>
    </>
  );
};

export default Auth(FractionalAsset, {absoluteStyle});
