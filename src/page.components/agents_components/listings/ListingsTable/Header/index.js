import React from 'react';
import {Box, Button, HStack, Image, Text} from '@chakra-ui/react';
import CollapsedHeader from './CollapsedHeader';
import filter_icon from '/src/images/icons/filter_icon.svg';
import sortByIcon from '/src/images/icons/sort-by-icon.svg';
import collapsedIcon from '/src/images/icons/collapsed-icon.svg';

import ExpandedHeader from './ExpandedHeader';

export default function ManageListingHeader({
  handleCollapsed,
  isCollapsed,
  allColumns,
  typeOfSort,
  selectedSortColumn,
  handleSort,
  setSortBy,
  listingType,
  setListingType,
  data,
}) {
  return (
    <>
      <Box>
        {isCollapsed ? (
          <CollapsedHeader
            handleCollapsed={handleCollapsed}
            allColumns={allColumns}
            typeOfSort={typeOfSort}
            selectedSortColumn={selectedSortColumn}
            handleSort={handleSort}
            setSortBy={setSortBy}
          />
        ) : (
          <ExpandedHeader
            data={data}
            handleCollapsed={handleCollapsed}
            listingType={listingType}
            setListingType={setListingType}
          />
        )}
      </Box>
      {/* <HStack w="full" spacing="16px" mb="13px" justify="flex-end">
        {isCollapsed ? (
          <Button
            bg="#4545FE"
            id="iscollapsed"
            borderRadius="12px"
            onClick={handleCollapsed}
          >
            <HStack spacing="4px">
              <Image src={collapsedIcon.src} alt="expand Icon" boxSize="18px" />
              <Text as="span" color="#ffffff" fontSize="16px" fontWeight="400">
                Collapse List
              </Text>
            </HStack>
          </Button>
        ) : (
          ""
        )}
        <Button
          alignSelf="flex-end"
          bg="transparent"
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
          width="144px"
          height="48px"
          border="1px solid #E4E4E4"
          borderRadius="12px"
        >
          <HStack justify="center" spacing="9px">
            <Image
              w="18px"
              h="18px"
              src={sortByIcon.src}
              alt="sort by icon"
              fontSize="10px"
            />{" "}
            <Text>Sort By</Text>
          </HStack>
        </Button>
        <Button
          //   onClick={onOpen}
          alignSelf="flex-end"
          bg="transparent"
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
          width="144px"
          height="48px"
          border="1px solid #E4E4E4"
          borderRadius="12px"
        >
          <HStack justify="center" spacing="9px">
            <Image
              w="18px"
              h="18px"
              src={filter_icon.src}
              alt="sort by icon"
              fontSize="10px"
            />{" "}
            <Text>filter</Text>
          </HStack>
        </Button>
      </HStack> */}
    </>
  );
}
