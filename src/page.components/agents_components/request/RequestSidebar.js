import {Box, Flex, Image, List, ListItem, Text} from '@chakra-ui/react';
import back_arrow from '/src/images/icons/back_arrow_circle_small.svg';
import {useRouter} from 'next/router';

export const RequestSidebar = ({tabs, tab, changeTab = el => {}}) => {
  const router = useRouter();

  return (
    <Flex
      direction={'column'}
      position={{base: 'static', lg: 'sticky'}}
      top={'150px'}
      width="100%"
      maxW={{base: '100%', lg: '258px'}}
      height={'max-content'}
      // display={{base: 'none', lg: 'flex'}}
    >
      <Box w="full">
        <Flex
          gap="8px"
          cursor={'pointer'}
          align="center"
          py={'10px'}
          mb={'10px'}
          onClick={() => router.back()}
          w="max-content"
          mr={'auto'}
        >
          <Image
            zIndex={10}
            style={{cursor: 'pointer'}}
            mr={2}
            height="50px"
            w="50px"
            src={back_arrow.src}
            alt="back_arrow"
          />
          <Text color="#475467" fontSize={'16px'} fontWeight={'500'} lineHeight={'20px'}>
            Back
          </Text>
        </Flex>
      </Box>
      <List
        borderRadius="8px"
        border="1px solid #EAECF0"
        box-shadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
        overflow={'hidden'}
        width={'100%'}
        display={{base: 'flex', lg: 'block'}}
      >
        {tabs.map((el, i) => (
          <ListItem
            key={i}
            p={'10px 16px'}
            bg={tab === el ? '#F5F5F5' : '#fff'}
            borderBottom={'1px solid #EAECF0'}
            onClick={() => changeTab(el)}
            gap={'8px'}
            alignItems={'center'}
            display={'flex'}
            cursor={'pointer'}
            flex={'1'}
          >
            {tab === el && <Box h="10px" w="10px" borderRadius={'50%'} bg={'#191919'}></Box>}
            <Text
              fontSize={'14px'}
              lineHeight={'20px'}
              fontWeight={tab === el ? '600' : '400'}
              color={tab === el ? '#191919' : '#344054'}
              textTransform={'capitalize'}
            >
              {el?.split('_')?.join(' ')}
            </Text>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};
