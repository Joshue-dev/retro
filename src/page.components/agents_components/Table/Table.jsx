/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {useMemo, useState} from 'react';
import {useTable, useSortBy, usePagination} from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  Text,
  Box,
  TableContainer,
  Image,
  VStack,
  HStack,
  SkeletonText,
  useBreakpointValue,
  useMediaQuery,
  Stack,
} from '@chakra-ui/react';
import collapsedIcon from '/src/images/icons/collapsed-icon.svg';
import collapsedDarkIcon from '/src/images/icons/collapsed-icon-dark.svg';
import {ImFilesEmpty} from 'react-icons/im';
import {useRouter} from 'next/router';
import expandIcon from '/src/images/icons/expand-icon.svg';
import expandDarkIcon from '/src/images/icons/expand-icon-dark.svg';
import emptyIcon from '/src/images/icons/emptyIcon.svg';
import {themeStyles} from '../../../theme';
import CustomPagination from './Pagination';
import TableFooter from './Footer';

export const MatadorCustomTable = ({
  headerSpace,
  dontExpand,
  forColumn,
  forData,
  columnHeight,
  isManageAgentEmpty,
  noTopPaginate,
  handleExpand,
  sortBy,
  filter,
  linkText,
  expanded,
  downloadcsv,
  isCollapsed,
  nextPageUrl,
  isRefetching,
  cellPadding,
  headerCellPadding,
  collapseText,
  DATA,
  COLUMNS,
  ...rest
}) => {
  if (isRefetching) {
    return (
      <Box
        padding="0"
        border={'solid 1px #f4f4f4'}
        borderRadius={'8px'}
        overflow={'hidden'}
        bg={'white'}
      >
        <SkeletonText skeletonHeight="60px" noOfLines={1} />
        <SkeletonText mt="4" noOfLines={6} spacing="10px" skeletonHeight="20px"></SkeletonText>
      </Box>
    );
  }
  const router = useRouter();
  const [pgSize, setPgSize] = useState(columnHeight ? 20 : 10);
  const data = DATA && useMemo(() => DATA, forData ? [...forData] : []);
  const columns = COLUMNS && useMemo(() => COLUMNS, forColumn ? [...forColumn] : []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: pgSize,
      },
    },
    useSortBy,
    usePagination
  );

  const {pageIndex} = state;
  const [isNotMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <Box
      pb="1.5em"
      w={{base: 'full', lg: 'fit-content'}}
      overflow="auto"
      borderRadius="xl"
      mx="auto"
    >
      <HStack
        mt={4}
        align={'center'}
        justify={
          (isCollapsed && isNotMobile && collapseText) || (!isCollapsed && !isNotMobile && linkText)
            ? 'space-between'
            : 'end'
        }
        pb={'13px'}
      >
        {isNotMobile ? null : isCollapsed ? collapseText : linkText}
        <HStack spacing="16px" pr="3px" justify="end" align="center">
          {!dontExpand && isNotMobile && (
            <Button
              bg={{md: '#4545FE'}}
              alignSelf="center"
              borderRadius="12px"
              display={page.length >= 5 ? 'initial' : isCollapsed ? 'initial' : 'none'}
              onClick={handleExpand}
            >
              <HStack spacing="4px">
                <Image
                  src={isCollapsed ? collapsedIcon.src : expandIcon.src}
                  alt={isCollapsed ? 'collapse Icon' : 'expand icon'}
                  boxSize="18px"
                />
                <Text
                  className="collapseforlistingsMain"
                  as="span"
                  color={{base: '#4545FE', md: '#ffffff'}}
                  fontSize="16px"
                  fontWeight="400"
                >
                  {isCollapsed ? 'Collapse List' : ' Expand List'}
                </Text>
              </HStack>
            </Button>
          )}
          {downloadcsv}
          {sortBy}
          {filter}
        </HStack>
      </HStack>
      {getTableProps ? (
        <Box borderTopRadius="16px" overflow="hidden">
          <TableContainer
            mx="auto"
            align="center"
            {...themeStyles.componentStyles.tableContainer}
            minW={{base: '90%', lg: '1184px'}}
            {...rest}
          >
            <Table
              minW={isManageAgentEmpty && {base: '90%', lg: '87.8vw'}}
              maxW="1440px"
              {...getTableProps()}
              colorScheme="gray"
              bg="white"
              fontFamily='Euclid Circular B'
            >
              <Thead
                p="0"
                h="56px"
                position="sticky"
                zIndex="1"
                top="0px"
                style={{overflow: 'scroll'}}
              fontFamily='Euclid Circular B'

              >
                {page && page?.length > 0
                  ? headerGroups?.map((headerGroup, indexKey) => (
                      <Tr p="0" key={indexKey} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, columnIndex) => (
                          <Th
                            px="2em"
                            display={column.display}
                            textAlign={
                              column.textAlign
                                ? column.textAlign
                                : headerSpace === 'evenly'
                                  ? 'left'
                                  : 'center'
                            }
                            key={columnIndex}
                            color={'#606060'}
                            fontWeight={'400'}
                            fontSize={'14px'}
                            textTransform={'capitalize'}
                            {...column.getHeaderProps()}
                            padding={column.hideHeader == `0px` ? null : headerCellPadding}
                            fontFamily='Euclid Circular B !important'
                          >
                            {column.hideHeader == true ? null : column.render('Header')}
                          </Th>
                        ))}
                      </Tr>
                    ))
                  : isManageAgentEmpty
                    ? headerGroups?.map((headerGroup, indexKey) => (
                        <Tr p="0" key={indexKey} {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column, columnIndex) => (
                            <Th
                              px="2em"
                              display={column.display}
                              textAlign={
                                column.textAlign
                                  ? column.textAlign
                                  : headerSpace === 'evenly'
                                    ? 'left'
                                    : 'center'
                              }
                              key={columnIndex}
                              color={'#606060'}
                              fontWeight={'400'}
                              fontSize={'14px'}
                              textTransform={'capitalize'}
                              {...column.getHeaderProps()}
                              padding={column.hideHeader == true ? `0px` : headerCellPadding}
                            >
                              {column.hideHeader == true ? null : column.render('Header')}
                            </Th>
                          ))}
                        </Tr>
                      ))
                    : null}
              </Thead>

              <Tbody w="full" p="1em" {...getTableBodyProps()}>
                {page && page?.length > 0 ? (
                  page.map((row, indx) => {
                    prepareRow(row);
                    let equityId = row?.original?.equity_id;
                    let userId = row?.original?.id;
                    return (
                      <Tr
                        cursor={nextPageUrl ? 'pointer' : ''}
                        key={indx}
                        onClick={() =>
                          nextPageUrl
                            ? router.push(
                                `${nextPageUrl}/${equityId ?? userId}${
                                  equityId ? `?user=${userId}` : ''
                                }`
                              )
                            : ''
                        }
                        className="tr1"
                        {...row.getRowProps()}
                        _hover={
                          nextPageUrl && {
                            bg: 'gray.50',
                          }
                        }
                      >
                        {row?.cells.map((cell, index) => {
                          return (
                            <Td
                              display={cell.column.display}
                              key={index}
                              textAlign="center"
                              color={'gray.600'}
                              {...cell?.getCellProps()}
                              padding={cellPadding}
                            >
                              {cell?.render('Cell')}{' '}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })
                ) : isManageAgentEmpty ? null : (
                  <VStack spacing={8} mx="auto" w="full" h="full" py="100px">
                    <ImFilesEmpty
                      style={{
                        height: '70px',
                        width: '75px',
                        color: '#4545FE',
                      }}
                    />
                    <Text w="full" textAlign="center" fontSize="1em" mx="auto">
                      {`Oops! you don't have any data yet...`}
                    </Text>
                  </VStack>
                )}
              </Tbody>
            </Table>

            {isManageAgentEmpty && page && !page?.length && (
              <VStack spacing={3} mx="auto" w="full" h="full" py="100px">
                <Image alt="empty table icon" src={emptyIcon.src} />
                <Text fontSize="20px" fontWeight="700">
                  Nothing Found
                </Text>
                <Text
                  w="full"
                  textAlign="center"
                  fontSize="14px"
                  fontWeight="400"
                  color="#606060"
                  mx="auto"
                >
                  {isManageAgentEmpty}
                </Text>
              </VStack>
            )}
            <TableFooter
              nextPage={nextPage}
              gotoPage={gotoPage}
              pageIndex={pageIndex}
              pageCount={pageCount}
              canNextPage={canNextPage}
              pageOptions={pageOptions}
              previousPage={previousPage}
              canPreviousPage={canPreviousPage}
              isManageAgentEmpty={isManageAgentEmpty}
              isCollapsed={isCollapsed}
              display={{base: 'none', md: 'flex'}}
              dontExpand={dontExpand}
            />
          </TableContainer>
          <TableFooter
            nextPage={nextPage}
            gotoPage={gotoPage}
            pageIndex={pageIndex}
            pageCount={pageCount}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            isManageAgentEmpty={isManageAgentEmpty}
            isCollapsed={isCollapsed}
            display={{base: 'flex', md: 'none'}}
            dontExpand={dontExpand}
          />
        </Box>
      ) : isRefetching == 'true' ? (
        <Box
          padding="0"
          border={'solid 1px #f4f4f4'}
          borderRadius={'8px'}
          overflow={'hidden'}
          bg={'white'}
        >
          <SkeletonText skeletonHeight="60px" noOfLines={1} />
          <SkeletonText mt="4" noOfLines={6} spacing="10px" skeletonHeight="20px"></SkeletonText>
        </Box>
      ) : (
        <Box
          padding="0"
          border={'solid 1px #f4f4f4'}
          borderRadius={'8px'}
          overflow={'hidden'}
          bg={'white'}
        >
          <SkeletonText skeletonHeight="60px" noOfLines={1} />
          <SkeletonText mt="4" noOfLines={6} spacing="10px" skeletonHeight="20px"></SkeletonText>
        </Box>
      )}
    </Box>
  );
};
export default MatadorCustomTable;
