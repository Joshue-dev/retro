import {
  Box,
  Center,
  HStack,
  Image,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {FaCaretRight} from 'react-icons/fa';
import {themeStyles} from '/src/theme';
import {Button} from '/src/ui-lib';
import {formatAmount} from '/src/utils';
import fallback from '/src/images/image-fallback.png';
import fractionalizedIcon from '/src/images/icons/fractionalizedIcon_agents.svg';
import { useFetchListingBundles } from 'ui-lib/ui-lib.hooks';

export const ListingInfoWholeUnits = ({listingDetail}) => {
  const router = useRouter();
  const {listingBundles} = useFetchListingBundles(listingDetail?.id);

  const [isNotMobile] = useMediaQuery('(min-width: 992px)');

  const UnitCard = ({unit, index}) => {
    return (
      <VStack
        // mr={{lg: 10}}
        // w="full"
        position={'relative'}
        bg="#FFFFFF"
        // minW={{lg: '312px'}}
        w="100%"
        maxW={{base: '160px', sm: `312px`, md: '380px'}}
        minW={{lg: '312px'}}
        p="14px"
        minH={{lg: '462px'}}
        boxShadow="sm"
        spacing="24px"
        align="flex-start"
        h="fit-content"
        borderRadius="16px"
        onClick={!isNotMobile ? () => router.push(`unit_info/${unit.id}`) : undefined}
      >
        <Center
          w={{base: '100%', lg: 'full'}}
          h={{base: 'auto', lg: '319px'}}
          aspectRatio={'1 / 1'}
          borderRadius="12px"
          position={'relative'}
          overflow={'hidden'}
          mx="auto"
        >
          <Image
            alt=""
            loading="lazy"
            minW={'100%'}
            minH={'100%'}
            src={unit?.photos[0]?.photo || fallback.src}
          />
        </Center>
        {unit.is_fraction_sale_available ? (
          <Button
            w={{base: 'max-content', lg: '149px'}}
            h="36px"
            variant="primary"
            bg="#4545FE"
            border="none"
            borderRadius="8px"
            fontSize="14px"
          >
            <HStack spacing="8px" w="full">
              <Image src={fractionalizedIcon.src} alt="fractionalizedIcon" />
              <Text
                as="span"
                color="#FFFFFF"
                fontSize={{base: '10px', lg: '14px'}}
                fontWeight="400"
              >
                Fractionalized
              </Text>
            </HStack>
          </Button>
        ) : null}
        <Stack w="full" px={{base: '2px', lg: 3}} pb={{base: '2px', lg: 4}}>
          <Text
            fontSize={{base: '14px', lg: '24px'}}
            fontWeight="600"
            color="#191919"
            lineHeight="30px"
            pb={{lg: 4}}
            // whiteSpace={'nowrap'}
          >
            {unit.unit_title}
          </Text>
          <Stack
            flexDirection={{base: 'column', lg: 'row'}}
            divider={
              <StackDivider borderColor={'gray.200'} mx={2} display={{base: 'none', lg: 'flex'}} />
            }
            w="full"
            borderRadius={'6px'}
            bg={{lg: '#F8F8F8'}}
            justifyContent={'space-between'}
            py={{lg: 4}}
            px={{lg: 2}}
            gap={{base: 2, lg: 0}}
          >
            <Stack w="full" gap={{base: 0, lg: 2}}>
              <Text fontSize={'14px'} fontWeight="400" color="#606060" lineHeight="18px">
                Unit size
              </Text>
              <Text
                fontSize={{base: '14px', lg: '18px'}}
                fontWeight="500"
                color="#191919"
                lineHeight="23px"
              >
                {unit?.unit_size}sqm
              </Text>
            </Stack>
            <Stack w="full" gap={{base: 0, lg: 2}} ml={{lg: 4}}>
              <Text fontSize={'12px'} fontWeight="400" color="#606060" lineHeight="18px">
                Unit price
              </Text>
              <Text
                fontSize={{base: '14px', lg: '18px'}}
                fontWeight="600"
                color="#191919"
                lineHeight="23px"
              >
                {`₦ ${formatAmount(unit?.price)}`}
              </Text>
            </Stack>
          </Stack>
          <Stack
            flexDirection={{base: 'column', lg: 'row'}}
            align={{lg: 'center'}}
            w="full"
            justify={'space-between'}
            py={2}
          >
            <Tag
              p={3}
              w={{base: '100px ', lg: '112px'}}
              size="md"
              colorScheme={unit.quantity >= '3' ? 'green' : 'red'}
              borderRadius="32px"
            >
              {unit.quantity < 1 ? (
                <TagLabel fontSize={'14px'} mx="auto">
                  Sold out
                </TagLabel>
              ) : (
                <TagLabel fontSize={'14px'} mx="auto">
                  {unit.quantity} units left
                </TagLabel>
              )}
            </Tag>
            <Text
              cursor="pointer"
              display="flex"
              fontSize={'14px'}
              fontWeight={500}
              color={'#454EF6'}
              onClick={() => router.push(`unit_info/${unit.id}`)}
              mt={{base: 4, lg: 0}}
            >
              Manage
              <FaCaretRight
                style={{marginTop: '3px'}}
                fontSize={{base: '14px', lg: '18px'}}
                color="#191919"
              />
            </Text>
          </Stack>
        </Stack>
      </VStack>
    );
  };

  return (
    <Box mt="40px" w={'full'}>
      <Text
        fontSize={{base: '18px', lg: '32px'}}
        mb={3}
        fontWeight="500"
        color="#191919"
        lineHeight="31px"
      >
        {/* Available Units */}
        Unit Type
      </Text>
      <Box
        w={'100%'}
        maxW={'100%'}
        overflowX={'auto'}
        css={{
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <HStack gap={{base: `16px`, md: '38px'}} minWidth="max-content" align={`stretch`}>
          {listingBundles &&
            listingBundles?.map((unit, index) => (
              <UnitCard key={index} unit={unit} index={index} />
            ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default ListingInfoWholeUnits;
