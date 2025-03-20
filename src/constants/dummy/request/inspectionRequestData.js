import femaleImg from '../../images/avatar.jpeg';

import {HStack, Image, Tag, TagLabel, Text, useToast} from '@chakra-ui/react';
import React, {useState} from 'react';
import {MatadorCustomDatePicker} from '../../components/common/Calendar/DatePicker';
import {Button} from '../../ui-lib';
import {useMutation} from 'react-query';
import {approveScheduledTour} from '../../apis/requests';
import {HandleInspectionRequestApproval} from './HandleInspectionRequestApproval';

export const INSPECTION_REQUEST_COLUMNS = data => [
  {
    Header: 'No.',
    accessor: row => {
      const position = 1 + data.indexOf(row);
      return <Text w="18px">{position}</Text>;
    },
  },
  {
    Header: 'Image',
    accessor: row => {
      return (
        <Image
          alt=""
          borderRadius="full"
          width="47.29px"
          src={row?.users?.avatar ?? femaleImg.src}
        />
      );
    },
  },
  {
    Header: 'Name',
    accessor: row => {
      return `${row?.users?.first_name} ${row?.users?.last_name}`;
    },
  },
  {
    Header: 'Property',
    accessor: row => {
      return `${row?.project?.name}`;
    },
  },
  {
    Header: 'Date',
    accessor: row => {
      return row?.time_date?.date;
    },
  },
  {
    Header: 'Time',
    accessor: row => {
      return row?.time_date?.time?.slice(0, -3);
    },
  },
  {
    Header: 'Type',
    accessor: row => {
      let status = row?.tour_method?.toLowerCase();
      const colorScheme = status === 'in-person' ? 'purple' : 'green';
      return (
        <Tag w="95px" h="36px" size="lg" colorScheme={colorScheme} borderRadius="full">
          <TagLabel mx="auto">{row.tour_method}</TagLabel>
        </Tag>
      );
    },
  },
  {
    Header: 'Action',
    accessor: row => {
      return (
        <HStack spacing={4} h="40px">
          <HandleInspectionRequestApproval requestId={row?.id} supervisorId={row?.supervisor} />

          <MatadorCustomDatePicker userId={row?.user} requestId={row?.id} />
        </HStack>
      );
    },
  },
];
