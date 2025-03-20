import {Image, Tag, TagLabel} from '@chakra-ui/react';
import React from 'react';
import femaleImg from '../../../images/avatar.jpeg';
import {Button} from '/src/ui-lib';

export const INSPECTION_REQUEST_DATA_HISTORY = [
  {
    id: 1,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 2,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Daniel Steward',
    date: '6th August',
    time: '08:00am',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 3,
    image: femaleImg,
    name: 'Ariene McCay',
    date: '6th August',
    time: '11:00am',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 4,
    image: femaleImg,
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 5,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 6,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 7,
    image: femaleImg,
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 8,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 9,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 10,
    image: femaleImg,
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 11,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 12,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Kathryn Murphy',
    date: '6th August',
    time: '01:00pm',
    type: 'Virtual',
    propt_name: 'Astrid 2.0',
  },
  {
    id: 13,
    image: femaleImg,
    r_time: '10:00am',
    r_date: '10 September',
    name: 'Mary Jane',
    date: '6th August',
    time: '09:30am',
    type: 'In Person',
    propt_name: 'Astrid 2.0',
  },
];

export const INSPECTION_REQUEST_COLUMNS_HISTORY = [
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
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Listing name',
    accessor: 'propt_name',
  },
  {
    Header: 'Type',
    accessor: row => {
      let status = row.type.toLowerCase();
      const colorScheme = status === 'in person' ? '#4545FE' : 'green';
      return (
        <Tag w="95px" h="36px" size="lg" colorScheme={colorScheme} borderRadius="full">
          <TagLabel mx="auto">{row.type}</TagLabel>
        </Tag>
      );
    },
  },
  {
    Header: 'Action',
    accessor: row => {
      return (
        <div>
          {row.r_date ? (
            <Button variant="default" w="149px" h="40px" bg="#12D8A0" color="white">
              Rescheduled
            </Button>
          ) : (
            <Button variant="primary" w="149px" h="40px">
              Accepted
            </Button>
          )}
        </div>
      );
    },
  },
  {
    Header: 'Reschedule Date',
    accessor: row => {
      return <p>{row.r_date ? row.r_date : '-'}</p>;
    },
  },
  {
    Header: 'Reschedule Time',
    accessor: row => {
      return <div>{row.r_time ? row.r_time : '-'}</div>;
    },
  },
];
