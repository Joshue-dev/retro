import femaleImg from '/src/images/property/r3.png';
import uploadIcon from '../../images/icons/upload-icon.png';
import {Image} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import {Button} from '/src/ui-lib';

export const DEED_REQUEST_DATA = [
  {
    id: 1,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 2,
    image: femaleImg,
    name: 'Albert Flores',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 3,
    image: femaleImg,
    name: 'Guy Hawkins',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 4,
    image: femaleImg,
    name: 'Jerome Bell',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 5,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 6,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 7,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 8,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 9,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 10,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 11,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
  {
    id: 12,
    image: femaleImg,
    name: 'Mary Jane',
    unit_type: '3 Bedroom',
    listing_name: 'Astrid 2.0',
  },
];

export const DEED_REQUEST_COLUMN = [
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
    Header: 'Unit Type',
    accessor: 'unit_type',
  },
  {
    Header: 'Listing Name',
    accessor: 'listing_name',
  },
  {
    Header: 'Action',
    accessor: row => {
      return (
        <Link prefetch={false} href="/request/deed_request/upload_doc">
          <Button variant="primary" w="149px">
            <Image alt="" h="20px" src={uploadIcon.src} mr={2} /> Upload
          </Button>
        </Link>
      );
    },
  },
];
