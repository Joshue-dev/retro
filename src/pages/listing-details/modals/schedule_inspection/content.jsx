import { useState } from "react";
import {
  ModalBody,
  Flex,
  Text,
  Box,
  Center,
  ModalHeader,
  ModalFooter,
  HStack,
  useTheme,
  useMediaQuery,
} from "@chakra-ui/react";
import { Button } from "ui-lib";
import { useMutation } from "react-query";
import { storeName } from "constants/routes";
import { requestATour } from "api/listing";
import { InspectionTypeSelect } from "./InspectionTypeSelect";
import { IoMdClose } from "react-icons/io";
import { TimeSelect } from "./TimeSelect";
import DatePicker from "react-datepicker";
import styled from "@emotion/styled";
import { useToastForRequest } from "ui-lib/ui-lib.hooks/useToast";
import { toastForError } from "utils/toastForErrors";
import PendingInspectionDetails from "./details";
const ScheduleInspectionContent = ({
  disclosure,
  info,
  inspectionDetails,
  refetch,
}) => {
  const toast = useToastForRequest();
  const [time, setTime] = useState("");
  const [tourMode, setTourMode] = useState(null);
  const [mainDate, setMainDate] = useState("");
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  const presentDay = new Date();
  const theme = useTheme();

  const proceedRequest = useMutation((body) => requestATour(body, info.id), {
    onSuccess: async (res) => {
      refetch();
      toast({
        title: "Thank You!",
        description: `We have received your request, we will get back to you as soon as possible`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      disclosure.onClose();
    },
    onError: (err) => {
      toastForError(err, true, toast);
    },
  });

  const handleSelectedDate = (date) => {
    return setMainDate(date);
  };

  const handleRequest = (e) => {
    e ? e.preventDefault() : null;
    if (mainDate && time && tourMode) {
      const realTime = time.slice(0, 2);
      let hours = parseInt(realTime, 10);
      if (time?.includes("PM") && hours !== 12) {
        hours += 12;
      } else if (time?.includes("AM") && hours === 12) {
        hours = 0;
      }

      const dateToUse = new Date(mainDate);
      dateToUse.setHours(hours);
      dateToUse.setMinutes(0);

      const isoLikeString = `${dateToUse.getFullYear()}-${(
        dateToUse.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${dateToUse
        .getDate()
        .toString()
        .padStart(2, "0")}T${dateToUse
        .getHours()
        .toString()
        .padStart(2, "0")}:${dateToUse
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${dateToUse
        .getSeconds()
        .toString()
        .padStart(2, "0")}.${dateToUse
        .getMilliseconds()
        .toString()
        .padStart(3, "0")}`;

      proceedRequest.mutate({
        time: isoLikeString,
        store_name: storeName,
        type: tourMode,
        mode: tourMode,
      });
    } else
      toast({
        description: `Please select a date, time and a tour mode`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  const incomplete =
    !mainDate || !time || !tourMode || proceedRequest.isLoading;
  const isDarkMode = theme.theme_name !== "light";
  return (
    <>
      {inspectionDetails ? (
        <PendingInspectionDetails
          details={inspectionDetails}
          disclosure={disclosure}
          info={info}
        />
      ) : (
        <Box>
          <ModalHeader p={`0rem`}>
            <HStack
              justify="space-between"
              p={{ base: "2.5rem 2rem", md: `3rem 2.1rem` }}
              borderBottom="0.4px solid"
              borderBottomColor={
                isDarkMode
                  ? "matador_border_color.200"
                  : "matador_border_color.300"
              }
            >
              <Text
                color="text"
                fontSize={{ base: `1.8rem`, lg: "2.15rem" }}
                fontWeight={600}
                textTransform={`uppercase`}
                textAlign={`left`}
                letterSpacing={`.13rem`}
              >
                Schedule Inspection
              </Text>
              <Center
                onClick={() => disclosure.onClose()}
                color="matador_text.100"
                cursor={`pointer`}
              >
                <IoMdClose fontSize={isMobile ? "2.5rem" : "3rem"} />
              </Center>
            </HStack>
          </ModalHeader>
          <ModalBody
            p={{ base: "1.6rem", lg: `2.8rem 2.4rem 0rem 2.4rem` }}
            minH={`32rem`}
            display={`flex`}
            flexDir={`column`}
            gap={`2.8rem`}
            maxH={`70vh`}
            overflow={`auto`}
            color="matador_text.500"
          >
            <Text
              fontSize={{ base: "1.6rem", md: "1.8rem" }}
              fontWeight="500"
              color="matador_text.500"
            >
              Select Date & Time
            </Text>
            <Flex
              flex={`1`}
              borderRadius={`1.1516rem`}
              border={`.1rem solid`}
              borderColor={`#F2F4F7`}
            >
              <TimeSelect time={time} setTime={setTime} />
              <Box bg={`#F2F4F7`} w={`.1rem`} />
              <Flex
                direction={`column`}
                align="center"
                justify="center"
                padding={{ base: `1.8rem .5rem`, lg: `0rem` }}
                w={`100%`}
              >
                <Wrap isDarkMode={isDarkMode} color={theme?.colors?.primary}>
                  <DatePicker
                    inline
                    showTimeSelect
                    minDate={presentDay}
                    selected={mainDate}
                    portalId="root-portal"
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    onChange={handleSelectedDate}
                    fixedHeight
                    // {...datePickerObj}
                  />
                </Wrap>
              </Flex>
            </Flex>
            <InspectionTypeSelect set_type={setTourMode} type={tourMode} />
          </ModalBody>
          <ModalFooter p={{ base: "1.6rem", lg: `2.8rem 2.4rem` }}>
            <Button
              isDisabled={incomplete}
              isLoading={proceedRequest.isLoading}
              onClick={handleRequest}
              w="full"
              color="#fff"
              // bg="primary"
              bg="primary"
              h={`100%`}
              // maxH={`max-content`}
              p="1.6rem 1.9rem"
            >
              <Text
                fontSize={`1.5rem`}
                fontWeight="400"
                fontFamily="Noto Sans"
                lineHeight={`133%`}
                letterSpacing={`.0144rem`}
                textTransform={`uppercase`}
              >
                Request this time
              </Text>
            </Button>
          </ModalFooter>
        </Box>
      )}
    </>
  );
};

export default ScheduleInspectionContent;

const Wrap = styled.div`
  .react-datepicker {
    border: none;
    // border-bottom: #f5f5f5 solid .1rem;
    // height: 100%;
    width: max-content;
    background-color: transparent;
  }
  .react-datepicker__time-container {
    display: none;
  }
  .react-datepicker__month-container {
    max-width: 100%;
    width: 100%;
    background-color: transparent;
  }

  .react-datepicker__day-names {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .react-datepicker__day-name {
    // width: calc(100% / 8);
    font-size: 1.4rem;
    width: 3.8rem;
    height: 3.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.9rem;
    font-weight: 500;
    color: ${(props) => (props.isDarkMode ? "#FFFFFF" : "#000000")};
  }
  .react-datepicker__day-name:hover {
    background-color: transparent !important;
    color: red;
  }
  .react-datepicker__day--disabled:hover {
    background: transparent !important;
    cursor: not-allowed;
  }
  .react-datepicker__day:hover {
    background: ${(props) => props.color};
    color: #fff;
  }
  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    font-family: Open Sans;
    background-color: transparent;
  }
  .react-datepicker__day--disabled {
    opacity: 0.5;
  }
  .react-datepicker__day {
    width: calc(100% / 8);
    font-size: 1.35rem;
    font-weight: 400;
    padding-top: 0.6rem;
    padding: 1.1rem 0rem 0rem;
    height: 3.8rem;
    transition: 0.3s ease-in-out;
    color: ${(props) => (props.isDarkMode ? "#FFFFFF" : "#000000")};
  }
  .react-datepicker__day--keyboard-selected {
    background: transparent;
  }
  .react-datepicker__day--selected {
    border-radius: 100%;
    background: ${(props) => props.color};
    color: #fff;
  }
  .react-datepicker__navigation--next--with-time:not(
      .react-datepicker__navigation--next--with-today-button
    ) {
    color: #424242;
  }

  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    border-color: ${(props) => (props.isDarkMode ? `#fff` : `#424242`)};
  }
  .react-datepicker__navigation--previous,
  .react-datepicker__navigation--next {
    position: absolute;
    top: 3rem;
    width: 3rem;
    height: 3rem;
    color: ${(props) => (props.isDarkMode ? `#fff` : `#424242`)};
  }
  .react-datepicker__navigation {
    overflow: visible;
    position: absolute;
    top: 0.8rem;
    font-size: 3.8rem;
    height: 3.8rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-datepicker__navigation--previous {
    left: 1.5rem;
  }
  .react-datepicker__navigation--next {
    right: 1.5rem;
  }

  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    border-color: ${(props) => (props.isDarkMode ? `#fff` : `#424242`)};

    opacity: 0.5;
    margin: auto;
    overflow: visible;
  }
  .react-datepicker__current-month {
    position: relative;
    // height: 8.1rem;
    height: 4.7rem;
    border-radius: 0.7rem;
    // margin: 0 auto;
    background: transparnt;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => (props.isDarkMode ? "#FFFFFF" : "#424242")};
    // font-family: Euclid Circular B;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    width: 100%;
  }
  .react-datepicker__header {
    background: transparent;
    border: none;
    padding-top: 0;
  }

  @media only screen and (max-width: 600px) {
    .react-datepicker__day-name {
      font-size: 1.2rem;
    }
    .react-datepicker__day {
      font-size: 1rem;
    }
    .react-datepicker {
      max-width: 300px;
    }
  }

  @media only screen and (max-width: 480px) {
    .react-datepicker__day--selected {
      height: 3.4rem;
      width: 3.4rem;
    }
    .react-datepicker {
      max-width: 225px;
    }
    .react-datepicker__day-name {
      padding: 0;
    }
  }
`;
