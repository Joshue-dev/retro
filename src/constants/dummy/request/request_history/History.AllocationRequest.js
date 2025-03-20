import {HStack, Image} from '@chakra-ui/react';
import React from 'react';
import femaleImg from '../../../images/avatar.jpeg';
import {Button} from '/src/ui-lib';

export const ALLOCATION_REQUEST_DATA_HISTORY = [
  {
    id: 1,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 2,
    image: femaleImg,
    name: 'Albert Flores',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 3,
    image: femaleImg,
    name: 'Guy Hawkins',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 4,
    image: femaleImg,
    name: 'Jerome Bell',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 5,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 6,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 7,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 8,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 9,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 10,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 11,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
  {
    id: 12,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
    allocation_number: 22,
  },
];

export const ALLOCATION_REQUEST_COLUMN_HISTORY = [
  {
    Header: 'No.',
    accessor: 'id',
  },
  {
    Header: 'Image',
    accessor: row => {
      return <Image alt="" borderRadius="full" height="48px" width="47.29px" src={row.image.src} />;
    },
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Listing Name',
    accessor: 'listing_name',
  },
  {
    Header: 'Unit Type',
    accessor: 'unit_type',
  },
  {
    Header: 'Allocation Number',
    accessor: 'allocation_number',
  },
  {
    Header: 'Action',
    accessor: row => {
      return (
        <Button mt={0} h="40px" variant="primary" w="149px" cursor="not-allowed">
          Accepted
        </Button>
      );
    },
  },
];
