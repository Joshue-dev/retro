import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import angledArrow from '/src/images/icons/angledArrow.svg';

import DatePicker from 'react-datepicker';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';
import calendarIcon from '../../../images/icons/calendarIconForCreateStore.svg';
import timeIcon from '../../../images/icons/timeIconforcreateStore.svg';
import {useState} from 'react';

export const CustomSingleDatePicker = ({handleSelectedDate, mainDate}) => {
  const [startDate, setStartDate] = useState(new Date());
  const presentDay = new Date();

  const ShowCalendar = useDisclosure();

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <Box>
      <HStack
        onClick={ShowCalendar.onOpen}
        h="50px"
        cursor="pointer"
        w="full"
        pl="17px"
        pr="11px"
        justify="space-between"
        borderRadius="0"
        border="solid 1px #E4E4E4"
      >
        <Text fontSize="14px" color="#606060" fontWeight="400">
          {mainDate ? new Date(mainDate).toDateString() : 'Select Preferred Day'}
        </Text>
        <Image alt="calendar Icon" src={calendarIcon.src} />
      </HStack>
      {/* Initial Calendar screen */}
      <Modal
        p="0"
        motionPreset="slideInBottom"
        isCentered={false}
        top="60px"
        overflow="scroll"
        // minW="327.4px"
        isOpen={ShowCalendar.isOpen}
        onClose={ShowCalendar.onClose}
      >
        <ModalOverlay />
        <ModalContent
          pt="14.8px"
          pb="21.9px"
          px="16.91px"
          mt="25vh"
          //   minW="fit-content"
          minW="fit-content"
          w="fit-content"
          borderRadius="5px"
        >
          <ModalBody p="0" w="fit-content">
            <Wrap>
              <DatePicker
                inline
                showTimeSelect
                minDate={presentDay}
                selected={startDate}
                portalId="root-portal"
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={date => setStartDate(date)}
              />
            </Wrap>
            <HStack w="full" justify="center" mt="16px">
              <Button
                fontWeight={500}
                onClick={() => ShowCalendar.onClose()}
                m="0 auto"
                bg="transparent"
                fontSize="12px"
                h="40px"
                py="9.39px"
                color="primary"
                _hover={{
                  opacity: '0.4',
                }}
                borderRadius="0px"
                border="1px solid"
                borderColor="primary"
                w="full"
              >
                Cancel
              </Button>
              <Button
                fontWeight={500}
                onClick={() => (handleSelectedDate(startDate), ShowCalendar.onClose())}
                m="0 auto"
                bg="primary"
                fontSize="12px"
                h="40px"
                py="9.39px"
                color="white"
                _hover={{
                  opacity: '0.4',
                }}
                borderRadius="0px"
                w="full"
              >
                Set
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const Wrap = styled.div`
  .react-datepicker {
    border: none;
    border-bottom: #f5f5f5 solid 1px;
    font-family: 'Montserrat';
  }
  .react-datepicker__time-container {
    display: none;
  }
  .react-datepicker__month-container {
    max-width: 250.723px;
    width: 300px;
  }

  .react-datepicker__day-names {
    width: 214px;
    margin: 0 auto;
  }

  .react-datepicker__day-name {
    // width: calc(100% / 8);
    font-size: 7px;
    width: 25px;
    height: 25px;
    font-weight: 500;
  }
  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    width: 210px;
    margin: 0 auto;
  }
  .react-datepicker__day {
    width: calc(100% / 8);
    font-size: 9.26px;
    font-weight: 600;
    padding: 0px;

    width: 25px;
    height: 25px;
    transition: 0.3s ease-in-out;
    :hover {
      width: 25px;
      height: 25px;
      //   border-radius: 100%;
    }
  }
  .react-datepicker__day--selected {
    width: 25px;
    height: 25px;
    // border-radius: 100%;
    background: #191919;
  }

  .react-datepicker__navigation--next--with-time:not(
      .react-datepicker__navigation--next--with-today-button
    ) {
    right: 2px;
    top: 14.98px;
  }

  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    border-color: #191919;
  }
  .react-datepicker__navigation--previous {
    left: 2px;
    top: 14.98px;
  }
  .react-datepicker__current-month {
    position: relative;
    // height: 81px;
    height: 46.9px;
    border-radius: 7px;
    // margin: 0 auto;
    background: #4545fe;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    color: #191919;
    font-size: 19px;
    font-weight: 500;
    letter-spacing: 1px;
    width: 100%;
  }
  .react-datepicker__header {
    background: #ffffff;
    border: none;
    padding-top: 0;
  }
`;

export const SelectTime = ({setTime, time}) => {
  const timeArray = ['12:00', '12:15', '12:30', '12:45'];
  const [timed, setTimed] = useState('10:00');
  const [timedSuffix, setTimedSuffix] = useState('AM');

  const handleSuffix = () => {
    setTimedSuffix(timedSuffix === 'AM' ? 'PM' : 'AM');
  };
  const increaseTime = () => {
    const [hour, minute] = timed.split(':');
    let updatedHour = parseInt(hour);
    let updatedMinute = parseInt(minute) + 15;

    if (updatedMinute >= 60) {
      updatedMinute -= 60;
      updatedHour = (updatedHour + 1) % 12;
    }

    if (updatedHour === 0) {
      updatedHour = 12;
    }

    const updatedTime = `${updatedHour.toString().padStart(2, '0')}:${updatedMinute
      .toString()
      .padStart(2, '0')}`;
    setTimed(updatedTime);
  };

  const decreaseTime = () => {
    const [hour, minute] = timed.split(':');
    let updatedHour = parseInt(hour);
    let updatedMinute = parseInt(minute) - 15;

    if (updatedMinute < 0) {
      updatedMinute += 60;
      updatedHour = (updatedHour - 1 + 12) % 12;
    }

    if (updatedHour === 0) {
      updatedHour = 12;
    }

    const updatedTime = `${updatedHour.toString().padStart(2, '0')}:${updatedMinute
      .toString()
      .padStart(2, '0')}`;
    setTimed(updatedTime);
  };

  return (
    <Menu autoFocus={false} closeOnSelect autoSelect={false} placement="bottom-start">
      <MenuButton
        as={Button}
        bg="#F7F6F7"
        px="0"
        h="full"
        w="full"
        _hover={{
          opacity: '1',
        }}
        _active={{
          opacity: '0.6',
        }}
      >
        <HStack
          h="50px"
          justify="space-between"
          pl="17px"
          w="full"
          pr="11px"
          borderRadius="none"
          border="1px solid #e4e4e4"
        >
          <Text
            className="montserrat-regular"
            fontSize="13px"
            color={time ? '#191919' : '#191919'}
            fontWeight="500"
          >
            {time ? `${time}` : 'Select Preferred Time (GMT + 1)'}
          </Text>
          {/* <Image alt="calendar Icon" src={timeIcon.src} /> */}
          <Image
            src={angledArrow.src}
            transform="rotate(-90deg)"
            alt="select arrow"
            boxSize="24px"
          />
        </HStack>
      </MenuButton>
      <MenuList
        _focus={{
          boxShadow:
            '4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15) !important',
        }}
        boxShadow="4px 4px 8px 0px rgba(123, 157, 157, 0.15), -4px -4px 8px 0px rgba(123, 157, 157, 0.15)"
        borderColor="transparent"
        borderRadius="8px"
        py="0"
        minW="80px"
        w="156px"
      >
        {/* <VStack spacing="none" pt="12px" pb="15px"> */}
        <HStack py="11.37px" w="full" justify="space-between">
          <Button
            padding="0"
            margin="0"
            background="none"
            border="none"
            _hover={{background: 'none'}}
            _focus={{boxShadow: 'none'}}
            _active={{background: 'none'}}
          >
            <ChevronLeftIcon fontSize="30px" onClick={decreaseTime} />
          </Button>

          <Text>{timed}</Text>

          <Button
            padding="0"
            margin="0"
            background="none"
            border="none"
            _hover={{background: 'none'}}
            _focus={{boxShadow: 'none'}}
            _active={{background: 'none'}}
          >
            <ChevronRightIcon fontSize="30px" onClick={increaseTime} />
          </Button>
        </HStack>
        <HStack w="full" py="11.37px" justify="space-between">
          <Button
            padding="0"
            margin="0"
            background="none"
            border="none"
            _hover={{background: 'none'}}
            _focus={{boxShadow: 'none'}}
            _active={{background: 'none'}}
          >
            <ChevronLeftIcon fontSize="30px" onClick={handleSuffix} />
          </Button>
          <Text>{timedSuffix}</Text>
          <Button
            padding="0"
            margin="0"
            background="none"
            border="none"
            _hover={{background: 'none'}}
            _focus={{boxShadow: 'none'}}
            _active={{background: 'none'}}
          >
            <ChevronRightIcon fontSize="30px" onClick={handleSuffix} />
          </Button>
        </HStack>

        <MenuItem pb="10px" bg="transparent" w="full" justifyContent="center" alignItems="center">
          <Button
            fontWeight={500}
            onClick={() => setTime(`${timed} ${timedSuffix}`)}
            mt="10px"
            _hover={{
              opacity: '0.5',
            }}
            h="42px"
            px="10px"
            color="white"
            bg="primary"
            borderRadius="5px"
          >
            Apply
          </Button>
        </MenuItem>
        {/* </VStack> */}
      </MenuList>
    </Menu>
  );
};
