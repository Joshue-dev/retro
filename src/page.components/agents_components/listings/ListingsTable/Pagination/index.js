import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {Flex, IconButton, Input, Spacer, Text} from '@chakra-ui/react';
import React from 'react';

export default function ManageListingPagination({
  gotoPage,
  nextPage,
  pageIndex,
  pageCount,
  canNextPage,
  canPreviousPage,
  previousPage,
  pageOptions,
}) {
  return (
    <Flex py={4} borderTop="1.5px solid" borderColor="gray.200" justifyContent="flex-end">
      {/* <Spacer /> */}
      <Flex alignContent="center">
        {/* <IconButton
					_focus={{boxShadow: ''}}
					_hover={{backgroundColor: ''}}
					_active={{backgroundColor: ''}}
					color='gray.800'
					bg='white'
					fontSize='15px'
					icon={<ArrowLeftIcon />}
					disabled={!canPreviousPage}
					onClick={() => gotoPage(0)}
				/> */}

        <Text m="0" alignSelf="center">
          Showing {pageIndex + 1} of {pageOptions?.length}{' '}
        </Text>
        <IconButton
          _focus={{boxShadow: ''}}
          _hover={{backgroundColor: ''}}
          _active={{backgroundColor: ''}}
          color="gray.800"
          bg="white"
          fontSize="30px"
          icon={<ChevronLeftIcon />}
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
        />
        <Input
          mx="5px"
          alignSelf="center"
          borderColor="gray.200"
          border="1px solid"
          onChange={e => {
            let pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
          w="10%"
          size="sm"
        />
        <IconButton
          _focus={{boxShadow: ''}}
          _hover={{backgroundColor: ''}}
          _active={{backgroundColor: ''}}
          color="gray.800"
          bg="white"
          fontSize="30px"
          icon={<ChevronRightIcon />}
          disabled={!canNextPage}
          onClick={() => nextPage()}
        />
        {/* <IconButton
					_focus={{boxShadow: ''}}
					_hover={{backgroundColor: ''}}
					_active={{backgroundColor: ''}}
					color='gray.800'
					bg='white'
					fontSize='15px'
					icon={<ArrowRightIcon />}
					disabled={!canNextPage}
					onClick={() => gotoPage(pageCount - 1)}
				/> */}
        {/* <Text
					m='0'
					alignSelf='center'
					borderRightColor=''
					defaultChecked={pageIndex + 1}
					borderColor='gray.300'
					fontWeight='bold'
					fontSize='sm'
					whiteSpace='nowrap'>
					Go to page
				</Text> */}
      </Flex>
    </Flex>
  );
}
