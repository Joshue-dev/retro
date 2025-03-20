import femaleImg from '/src/images/property/r3.png';
import uploadIcon from '../../images/icons/upload-icon.png';
import {HStack, Image} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import {Button} from '/src/ui-lib';

export const AGENT_REQUEST_DATA = [
  {
    id: 1,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 2,
    image: femaleImg,
    name: 'Albert Flores',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 3,
    image: femaleImg,
    name: 'Guy Hawkins',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 4,
    image: femaleImg,
    name: 'Jerome Bell',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 5,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 6,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 7,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 8,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 9,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 10,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 11,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
  {
    id: 12,
    image: femaleImg,
    name: 'Mary Jane',
    phone_number: '08166111593',
    email_address: 'mary@gmail.com',
  },
];

export const AGENT_REQUEST_COLUMN = [
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
    Header: 'Phone number',
    accessor: 'phone_number',
  },
  {
    Header: 'Email Address',
    accessor: 'email_address',
  },
  {
    Header: 'Action',
    accessor: row => {
      return (
        <HStack spacing={4} h="40px">
          <Button mt={0} variant="primary" w="149px">
            Accept
          </Button>
          <Button variant="secondary" w="149px">
            Reject
          </Button>
        </HStack>
      );
    },
  },
];
