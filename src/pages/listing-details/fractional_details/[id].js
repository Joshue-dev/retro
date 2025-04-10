import React from 'react';
import {Box, Center, Divider, HStack, Text, useDisclosure, VStack} from '@chakra-ui/react';
import {Button, Spinner} from '../../../ui-lib';
import {useRouter} from 'next/router';
import {formatToCurrency} from '../../../utils';
import AssetCarouselMobile from '../../../components/assetCarousel/mobile';
import {LayoutView} from '../../../components/page_layout';
import {useQuery} from 'react-query';
import {fetchFractionalInfo} from '../../../api/listing';
import ErrorState from '../../../components/appState/error-state';
import FractionalMobileModal from './fractionalMobileModal';
import useLocalStorage from '../../../utils/hooks/useLocalStorage';

const FractionalDetailsMobile = ({setStep}) => {
  const router = useRouter();
  const fractionalId = router.query.id;
  const fractionalModal = useDisclosure();

  const [storeThemeInfo] = useLocalStorage('storeThemeInfo');

  const fractionalIsEnabled = storeThemeInfo?.isFractionalEnabled ?? false;

  const {
    data: fractionalDetail,
    isLoading,
    isError,
  } = useQuery(['fractional', fractionalId], () => fetchFractionalInfo(fractionalId), {
    enabled: !!fractionalId,
  });
  const fractionalData = fractionalDetail?.data;
  const unitData = fractionalData?.fraction_data?.unit;

  const slideImages =
    unitData?.photos?.map(image => ({
      original: image.photo,
      thumbnail: image.photo,
    })) || [];

  const fractionalPercent = Math.ceil(
    (Number(unitData?.total_purchased_fractions) / Number(unitData?.total_fractions)) * 100
  ).toFixed(2);

  const leftFractions =
    Number(unitData?.total_fractions) - Number(unitData?.total_purchased_fractions);

  return (
    <LayoutView noPadding h="full" display={{base: 'block', md: 'none'}}>
      <Box w="full" h="full" minH={'90vh'}>
        {isLoading ? (
          <Center w="full" h="80vh">
            <Spinner noAbsolute />
          </Center>
        ) : isError ? (
          <ErrorState />
        ) : (
          <Box h="full" px={{base: '1.6rem', lg: '2.4rem'}} pt="2.0rem" w="full">
            <AssetCarouselMobile noBorderRadius slideImages={slideImages} />
            <Text
              mt="1.6rem"
              className="gilda-display-medium"
              fontSize={'2.8rem'}
              lineHeight={'140%'}
              textTransform={'uppercase'}
              color="matador_text.100"
            >
              {unitData?.project?.name}
            </Text>

            <Text
              mt="1.6rem"
              className="montserrat-regular"
              fontSize={'1.3rem'}
              fontWeight={500}
              color="#606060"
            >
              Price per fraction {formatToCurrency(unitData?.price_per_fraction)}
            </Text>

            <Box
              mt="1.6rem"
              w="full"
              bg="#FBFCFC"
              border=".2rem solid #E4E4E4"
              borderRadius={'.5rem'}
              px="1.0rem"
              pb=".9rem"
            >
              <Box
                mt="3.9rem"
                bg="#19191933"
                w="full"
                h="1.0rem"
                borderRadius={'full'}
                position={'relative'}
              >
                <Box
                  position={'absolute'}
                  h="2.0rem"
                  w=".2rem"
                  bg="primary"
                  left={`${fractionalPercent}%`}
                  top="-.5rem"
                />
                <Text
                  position={'absolute'}
                  color="primary"
                  left={`${fractionalPercent - (fractionalPercent > 90 ? 10 : 3)}%`}
                  top="-3.0rem"
                >
                  {`${fractionalPercent}%`}
                </Text>
                <Box w={`${fractionalPercent}%`} h="full" bg="primary" borderRadius={'full'} />
              </Box>
              <HStack w="full" align="center" justify={'space-between'} mt="1.0rem" px=".4rem">
                <Text fontSize={'1.1rem'} fontWeight={400} color="#191919">
                  {unitData?.total_purchased_fractions} fractions sold
                </Text>
                <Text fontSize={'1.1rem'} fontWeight={400} color="#191919">
                  {leftFractions} fractions left
                </Text>
              </HStack>
            </Box>

            {fractionalIsEnabled ? (
              <Button
                mt="2.0rem"
                h="4.8rem"
                w="full"
                color="white"
                bg={leftFractions <= 0 ? '#191919' : 'primary'}
                zIndex="100"
                isDisabled={leftFractions <= 0}
                onClick={fractionalModal.onOpen}
              >
                {leftFractions <= 0 ? 'Fraction Sold out' : 'Buy Fraction'}
              </Button>
            ) : null}

            <VStack
              w="full"
              justify={'space-between'}
              mt="2.0rem"
              gap="1.0rem"
              divider={<Divider />}
            >
              <HStack justify="space-between" w="full">
                <Text fontSize={'1.3rem'} fontWeight={500} color="#606060">
                  Unit Type
                </Text>
                <Text
                  fontSize={'1.6rem'}
                  fontWeight={500}
                  color="#191919"
                  textTransform="capitalize"
                >
                  {fractionalData?.fraction_data?.unit?.unit_title || '-'}
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'1.3rem'} fontWeight={500} color="#606060">
                  Holding Period
                </Text>
                <Text
                  fontSize={'1.6rem'}
                  fontWeight={500}
                  color="#191919"
                  textTransform="capitalize"
                >
                  {unitData?.holding_period || '-'}
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'1.3rem'} fontWeight={500} color="#606060">
                  {`Investor's Packet`}
                </Text>
                <Text
                  border={'.1rem solid'}
                  borderColor="matador_text.100"
                  p=".4rem 1.6rem"
                  fontSize={'1.6rem'}
                  fontWeight={500}
                  color="text"
                  cursor={'pointer'}
                  onClick={() =>
                    window.open(
                      `${
                        fractionalData?.packets?.[0]?.packet
                          ? fractionalData?.packets?.[0]?.packet
                          : ''
                      }`,
                      '_blank'
                    )
                  }
                >
                  View
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'1.3rem'} fontWeight={500} color="#606060">
                  Fractional Investors
                </Text>
                <Text
                  fontSize={'1.6rem'}
                  fontWeight={500}
                  color="#191919"
                  textTransform="capitalize"
                >
                  {fractionalData?.partners?.length || '-'}
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'1.3rem'} fontWeight={500} color="#606060">
                  Dividend Payout Type
                </Text>
                <Text
                  fontSize={'1.6rem'}
                  fontWeight={500}
                  color="#191919"
                  textTransform="capitalize"
                >
                  {fractionalData?.extra_info?.dividend_payout || '-'}
                </Text>
              </HStack>
              <HStack justify="space-between" w="full">
                <Text fontSize={'1.3rem'} fontWeight={500} color="#606060">
                  Dividend Payout Amount
                </Text>
                <Text
                  fontSize={'1.6rem'}
                  fontWeight={500}
                  color="#191919"
                  textTransform="capitalize"
                >
                  {fractionalData?.extra_info?.dividend_amount
                    ? formatToCurrency(fractionalData?.extra_info?.dividend_amount)
                    : '-'}
                </Text>
              </HStack>
            </VStack>
          </Box>
        )}
      </Box>
      <FractionalMobileModal fractionalModal={fractionalModal} fractionalData={fractionalData} />
    </LayoutView>
  );
};

export default FractionalDetailsMobile;
