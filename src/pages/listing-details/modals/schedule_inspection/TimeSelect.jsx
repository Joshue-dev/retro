import {Box, Center, Flex, HStack, Stack, Text} from '@chakra-ui/react';
import {useRef} from 'react';
import {IoChevronDown, IoChevronUp} from 'react-icons/io5';

export const TimeSelect = ({time, setTime}) => {
  const currentTime = new Date()
  const scrollbar_ref = useRef();
  //prettier-ignore
  const times = [
    `08:00AM`,`09:00AM`,`10:00AM`,`11:00AM`,`12:00PM`,
    `01:00PM`,`02:00PM`,`03:00PM`,`04:00PM`,`05:00PM`,
  ];

  const scroll_up = () => {
    const target = scrollbar_ref.current;
    const my_target = document.getElementById('schedule_time');
    my_target?.scrollBy(0, -100);
  };

  const scroll_down = () => {
    const target = scrollbar_ref.current;
    const my_target = document.getElementById('schedule_time');
    my_target?.scrollBy(0, 100);
  };

  const parseTime = (timeStr) => {
    const [hourMinute, period] = timeStr.match(/(\d{1,2}:\d{2})(AM|PM)/).slice(1, 3);
    const [hours, minutes] = hourMinute.split(':').map(Number);

    let date = new Date();
    date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };


  return (
    <Flex
      direction={`column`}
      p={{base: `.4rem`, lg: `1.15rem 1.535rem`}}
      w={`13.4rem`}
      maxW={{ base: '8.4rem', md: `13.4rem`}}
      h={`38.0rem`}
      flex={`1`}
      gap={`.3884rem`}
      color={`matador_text.500`}
      fontFamily="Open Sans"
      align={`center`}
    >
      <Center w={`2.65rem`} h={`2.65rem`} onClick={scroll_up} cursor={`pointer`}>
        <IoChevronUp fontSize={`2.0rem`} />
      </Center>
      <Box
        id={`schedule_time`}
        ref={scrollbar_ref}
        flex={`1`}
        overflowY={`auto`}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
        scrollBehavior={`smooth`}
        scrollSnapType={`y mandatory`}
      >
       <Stack gap=".3884rem">
          {times.map((el, i) => {
            const elTime = parseTime(el);
            const isDisabled = elTime < currentTime;

            return (
              <HStack
                key={i}
                p={{ base: '1rem 1.535rem' }}
                fontSize={{ base: '1.1rem', md: '1.4rem' }}
                fontWeight="400"
                lineHeight="2.0rem"
                letterSpacing=".014rem"
                cursor={isDisabled ? 'not-allowed' : 'pointer'}
                onClick={() => !isDisabled && setTime(el)}
                color={isDisabled ? 'gray.400' : time === el ? '#ffffff' : 'inherit'}
                bg={time === el ? 'primary' : 'transparent'}
                scrollSnapAlign="start"
                scrollSnapStop="always"
                userSelect="none"
                borderRadius=".6rem"
                transition=".3s"
                opacity={isDisabled ? 0.75 : 1}
              >
                <Text>{el}</Text>
              </HStack>
            );
          })}
        </Stack>
      </Box>
      <Center w={`2.65rem`} h={`2.65rem`} onClick={scroll_down} cursor={`pointer`}>
        <IoChevronDown fontSize={`2.0rem`} />
      </Center>
    </Flex>
  );
};

export default TimeSelect;
