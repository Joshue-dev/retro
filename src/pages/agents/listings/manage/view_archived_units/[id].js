import React from 'react';
import {useRouter} from 'next/router';
import {themeStyles} from '/src/theme';
import {useQuery} from 'react-query';
import {fetchAllArchivedUnits} from '/src/api/listings';
import {AnimatedLoader} from '/src/components';
import {
  Box,
  Heading,
  Stack,
  HStack,
  Image,
  Text,
  VStack,
  Tag,
  TagLabel,
  Flex,
} from '@chakra-ui/react';
import backArrow from '/src/images/icons/back-arrow.png';
import {SwalError} from '/src/ui-lib';
import ConvertToFractions from '/src/page.components/agents_components/listings/ListingInfo.components/ListingInfo.details/convertToFractions';
import {FaCaretRight} from 'react-icons/fa';
import {formatAmount} from '/src/utils';
import RemoveFromArchive from '/src/page.components/agents_components/listings/unit_info/RemoveFromArchive';
import fallback from '/src/images/image-fallback.png';
import {Button} from '/src/ui-lib/ui-lib.components';
import { AgentsLayoutView } from 'page.components/agents_components/AgentLayout';

export const ViewArchivedUnits = () => {
  const {query} = useRouter();
  const router = useRouter();
  const ArchivedUnits = useQuery(['archivedUnits', query.id], () =>
    fetchAllArchivedUnits(query.id)
  );

  if (ArchivedUnits.isLoading) {
    return <AnimatedLoader />;
  }
  if (ArchivedUnits.isError) {
    return <SwalError errMsgTitle={'Oops!'} errMsgDesc={`An error occurred while fetching...`} />;
  }

  const handleBack = () => {
    router.back();
  };

  const ARCHIVED__UNITS = ArchivedUnits.data ? ArchivedUnits.data.data.data : [];

  return (
    <div style={{background: '#FAFAFA'}}>
      <AgentsLayoutView activePage="listings" />
      <Box mt="-80vh" maxW="1280px" mx="auto" mb="60px">
        <HStack onClick={handleBack} zIndex="10" position="relative">
          <Image
            style={{cursor: 'pointer'}}
            mr={2}
            boxSize="50px"
            src={backArrow.src}
            alt="back_arrow"
          />
          <Heading {...themeStyles.textStyles.h3}>Back</Heading>
        </HStack>
        <Heading {...themeStyles.textStyles.h2}>Archived Units</Heading>
        <Flex justify="flex-start" gap="46px 36px" w="full" flexWrap="wrap" minW="auto">
          {ARCHIVED__UNITS.length > 0 ? (
            ARCHIVED__UNITS.map((unit, index) => (
              <VStack
                w="full"
                key={index}
                bg="#FFFFFF"
                maxW="292px"
                p="24px 26px"
                minH="482px"
                boxShadow="md"
                spacing="24px"
                align="flex-start"
                h="fit-content"
                borderRadius="16px"
              >
                <Image
                  alt=""
                  w="full"
                  maxW="240px"
                  h="219px"
                  borderRadius="28px"
                  src={unit?.photos[index]?.photo ?? fallback.src}
                />
                {unit.is_fraction_sale_available ? (
                  <Button w="158px" h="36px" variant="primary" fontSize="14px">
                    Fractionalized
                  </Button>
                ) : (
                  <ConvertToFractions />
                )}
                <Text fontSize="24px" fontWeight="600" color="#191919" lineHeight="30px">
                  {unit.unit_title}
                </Text>
                <Stack fontSize="4px">
                  <Text fontSize="14px" fontWeight="400" color="#606060" lineHeight="18px">
                    Unit size
                  </Text>
                  <Text fontSize="18px" fontWeight="500" color="#191919" lineHeight="23px">
                    {unit.unit_size}sqm
                  </Text>
                </Stack>
                <Stack fontSize="4px">
                  <Text fontSize="14px" fontWeight="400" color="#606060" lineHeight="18px">
                    Unit price
                  </Text>
                  <Text fontSize="18px" fontWeight="500" color="#191919" lineHeight="23px">
                    {`₦ ${formatAmount(unit.price)}`}
                  </Text>
                </Stack>
                {/* <Tag p={3} w='112px' size='md' colorScheme={unit.total_purchased_units === unit.total_quantity ? 'red' : unit.quantity === 5 ? 'orange' : 'teal'} borderRadius='32px'>
									<TagLabel mx='auto'>{unit.total_purchased_units === unit.total_quantity ? 'Sold out' : `${unit.quantity} units left`}</TagLabel>
								</Tag> */}
                <Tag p={3} w="112px" size="md" colorScheme={'teal'} borderRadius="32px">
                  <TagLabel mx="auto">{unit.total_archive}</TagLabel>
                </Tag>
                <Text
                  cursor="pointer"
                  display="flex"
                  fontSize="14px"
                  fontWeight={500}
                  color={themeStyles.color.primary}
                  onClick={() =>
                    router.push({
                      pathname: `/listings/manage/unit_info/${unit.id}`,
                      query: unit,
                    })
                  }
                >
                  View Unit Info
                  <FaCaretRight style={{marginTop: '3px'}} fontSize="18px" color="#191919" />
                </Text>
                <RemoveFromArchive bundleId={unit.id} />
              </VStack>
            ))
          ) : (
            <Heading {...themeStyles.textStyles.h2}>Your Archive is empty</Heading>
          )}
        </Flex>
      </Box>
    </div>
  );
};

export default ViewArchivedUnits;
