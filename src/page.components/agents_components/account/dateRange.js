import React, {useState, useRef} from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  HStack,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import calendar_agents_inspection from '/src/images/icons/calendar_agents_inspection.svg';
import {reversedDayMonthYear} from 'utils/formatDate';

const DateRange = ({isOpen, onClose, onOpen, setQuery}) => {
  const [date, setDate] = useState({from: '', to: ''});
  const fromDate = useRef();
  const toDate = useRef();

  const applyFilter = () => {
    setQuery(
      `?start_date=${reversedDayMonthYear(date.from)}&end_date=${reversedDayMonthYear(date.to)}`
    );
    fromDate.current.value = '';
    toDate.current.value = '';
    onClose();
  };
  const handleChange = e => {
    const inputDate = new Date(e.target.valueAsNumber);

    return (
      !isNaN(inputDate.getTime()) && setDate({...date, [e.target.name]: inputDate.toISOString()})
    );
  };

  const isValid = date.from && date.to;

  return (
    <Menu isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
      <MenuButton onClick={onOpen}>
        <HStack
          cursor="pointer"
          transition="0.5s ease-in-out background-color"
          bg={'transparent'}
          px="5px"
          h="26px"
          minW="80px"
          justify="center"
          borderRadius="8px"
        >
          <Text
            transition="0.5s ease-in-out color"
            color={'#4545FE'}
            fontSize="14px"
            fontWeight="600px"
          >
            Date Range
          </Text>
        </HStack>
      </MenuButton>

      <MenuList
        position="relative"
        zIndex="2"
        w="388px"
        minH="319px"
        py="20px"
        boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
        borderRadius="16px"
        bg="#ffffff"
      >
        <VStack spacing="7px" w="full">
          <VStack w="full" px="26px" align="start" spacing="9px">
            <Image
              alignSelf="start"
              src={calendar_agents_inspection.src}
              alt="back button"
              mb="8px"
            />

            <Heading fontFamily='Euclid Circular B' fontSize="14px" fontWeight="600">
              Select Date Range
            </Heading>
          </VStack>
          <VStack px="26px" w="full" spacing="5px">
            <Text
              as="label"
              alignSelf="flex-start"
              htmlFor="from"
              fontSize="14px"
              fontWeight="400"
              color="#191919"
            >
              From
            </Text>
            <Input
              ref={fromDate}
              placeholder="Select date"
              className="dateforManageAgent"
              type="date"
              borderColor="#E4E4E4"
              h="50px"
              w="full"
              borderRadius="8px"
              name="from"
              onChange={handleChange}
            />
          </VStack>
          <VStack px="26px" w="full" spacing="5px">
            <Text
              as="label"
              alignSelf="flex-start"
              htmlFor="from"
              fontSize="14px"
              fontWeight="400"
              color="#191919"
            >
              To
            </Text>
            <Input
              ref={toDate}
              name="to"
              className="dateforManageAgent"
              onChange={handleChange}
              placeholder="Select date"
              type="date"
              borderColor="#E4E4E4"
              h="50px"
              w="full"
              borderRadius="8px"
            />
          </VStack>
          <Box pt="15px" w="full" justifySelf="flex-end" px="26px">
            <Button
              w="full"
              // h="36.52px"
              py="10px"
              borderRadius="8px"
              bg="#191919"
              color={'#FFFFFF'}
              fontWeight={'400'}
              fontSize={'18px'}
              lineHeight={'23px'}
              isDisabled={!isValid}
              onClick={applyFilter}
              _hover={{
                shadow: 'md',
              }}
              _active={{
                opacity: 0.8,
              }}
            >
              Proceed
            </Button>
          </Box>
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default DateRange;
