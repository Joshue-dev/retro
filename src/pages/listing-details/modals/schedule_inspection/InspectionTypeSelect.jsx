import {Box, Center, Flex, FormLabel, Stack, Text} from '@chakra-ui/react';
import {Checkbox2} from 'ui-lib';
import {Checkbox3} from 'ui-lib/ui-lib.components/Checkbox/Check';

export const InspectionTypeSelect = ({type, set_type}) => {
  return (
    <Flex gap={`1.7rem`} direction={'column'} align={'stretch'} w="full">
      <FormLabel color="matador_text.500" m="0rem" fontSize={'1.6rem'}>
        Inspection type
      </FormLabel>
      <Flex gap={`5.9rem`}>
        <Checkbox3
          isChecked={type === `in-person`}
          onClick={() => set_type('in-person')}
          h={`2.14rem !important`}
          w={`2.14rem !important`}
          minW={`2.14rem !important`}
          borderRadius={`.4rem`}
        >
          <Text
            color={`matador_text.100`}
            fontFamily={`Open Sans`}
            fontSize={{ base: '1.4rem', md: "1.6rem"}}
            fontWeight="500"
            lineHeight="2rem"
          >
            In-Person
          </Text>
        </Checkbox3>
        <Checkbox3
          isChecked={type === `video`}
          onClick={() => set_type('video')}
          h={`2.14rem !important`}
          w={`2.14rem !important`}
          minW={`2.14rem !important`}
          borderRadius={`.4rem`}
        >
          <Text
            color={`matador_text.100`}
            fontFamily={`Open Sans`}
            fontSize={{ base: '1.4rem', md: "1.6rem"}}
            fontWeight="500"
            lineHeight="2rem"
          >
            Virtual
          </Text>
        </Checkbox3>
      </Flex>
    </Flex>
  );
};

export default InspectionTypeSelect;
