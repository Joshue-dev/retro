import {Stack, Flex, Skeleton} from '@chakra-ui/react';

export const GraphLoader = () => {
  return (
    <Stack
      w="80%"
      h="full"
      borderBottom="1px solid #E4E4E4"
      borderLeft="1px solid #E4E4E4"
      p="10px"
    >
      <Flex gap="22px" align="flex-end">
        <Skeleton width="10px" height="150px" />
        <Skeleton width="10px" height="150px" />
        <Skeleton width="10px" height="150px" />
        <Skeleton width="10px" height="150px" />
        <Skeleton width="10px" height="150px" />
        <Skeleton width="10px" height="150px" />
        <Skeleton width="10px" height="150px" />
        <Skeleton width="10px" height="150px" />
      </Flex>
    </Stack>
  );
};

export default GraphLoader;
