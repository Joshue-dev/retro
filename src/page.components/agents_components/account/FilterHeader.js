import {Box, HStack, Text, useDisclosure, useRadio, useRadioGroup} from '@chakra-ui/react';
import React from 'react';
import {generateID} from 'utils/generateId';
import DateRange from './dateRange';

const CustomRadio = props => {
  const {filterName, ...radioProps} = props;
  const {state, getInputProps, getRadioProps, htmlProps, getLabelProps} = useRadio(radioProps);

  return (
    <label {...htmlProps}>
      <input {...getInputProps({})} hidden />
      <HStack
        cursor="pointer"
        transition="0.5s ease-in-out background-color"
        {...getRadioProps()}
        bg={state.isChecked ? '#4545FE' : 'transparent'}
        px="5px"
        h="26px"
        minW="80px"
        justify="center"
        borderRadius="8px"
      >
        <Text
          transition="0.5s ease-in-out color"
          {...getLabelProps()}
          color={state.isChecked ? '#ffffff' : '#4545FE'}
          fontSize="14px"
          fontWeight="600px"
        >
          {filterName}
        </Text>
      </HStack>
    </label>
  );
};

const FilterHeader = ({setDate}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const filterArray = [
    {filterName: 'All Time', value: '0'},
    {filterName: 'By Tomorrow', value: '?days=1'},
    {filterName: 'In 3 Days', value: '?days=3'},
    {filterName: 'In 1 Week', value: '?days=7'},
    {filterName: 'In 1 Month', value: '?days=30'},
    // {filterName: 'Date Range', value: ''},
  ];

  const handleChange = value => {
    setDate(value);
  };

  const {getRadioProps, getRootProps} = useRadioGroup({
    defaultValue: '0',
    onChange: handleChange,
  });
  return (
    <HStack {...getRootProps()} spacing="24px">
      <Text fontSize="12px" fontWeight="500px">
        View Method
      </Text>
      <HStack bg="#ffffff" borderRadius="12px" spacing="12px" py="3.5px" px="7.5px ">
        {filterArray.map(item => {
          return (
            <CustomRadio
              key={generateID()}
              filterName={item.filterName}
              {...getRadioProps({value: item.value})}
            />
          );
        })}
        <DateRange isOpen={isOpen} onClose={onClose} onOpen={onOpen} setQuery={setDate} />
      </HStack>
    </HStack>
  );
};

export default FilterHeader;
