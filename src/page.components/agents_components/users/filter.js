import {
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Switch,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import searchIcon from '/src/images/icons/search_icon.svg';
import {useRouter} from 'next/router';
import {useState} from 'react';
import filter_icon from '/src/images/icons/filter_icon.svg';

const Filter = ({listings, setUrl, url, isFractional}) => {
  const [filteredListings, setFilteredListings] = useState(listings);
  const [search, setSearch] = useState('');
  const [toBeFiltered, setToBeFiltered] = useState({});
  const {isOpen, onClose, onOpen} = useDisclosure();
  const payment = ['payment plan', 'Outright'];
  const status = ['Active', 'Inactive'];
  const router = useRouter();

  const handleCheck = (e, prop) => {
    setToBeFiltered({...toBeFiltered, [prop]: e});
  };

  const handleSearch = e => {
    setSearch(e.target.value);
    const filtered = listings.filter(item =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    );

    return setFilteredListings(filtered);
  };

  const handleChange = e => {
    if (e?.target?.name === 'fractional')
      setToBeFiltered({
        ...toBeFiltered,
        [e.target.name]: !toBeFiltered[e.target.name],
      });

    if (e.target?.name === 'number_of_bedroom')
      setToBeFiltered({
        ...toBeFiltered,
        [e.target.name]: e.target.textContent,
      });
  };

  const applyFilter = () => {
    if (!Object.entries(toBeFiltered).length) {
      setUrl({
        ...url,
        filter: '',
        param: `${url.sort && 'lower_filter=true&'}${url.sort}`,
      });
      router.push(`${router.route}${url.sort && '?lower_filter=true&'}${url.sort}`);
      return onClose();
    }

    const filter_param = `${Object.entries(toBeFiltered)
      .map(([name, value]) => {
        if (value === 'Any') {
          return null;
        }
        if (name === 'listing[]') {
          return `${value.map(item => `${name}=${item}`).join('&')}`;
        }
        if (name === 'payment_plan' || name === 'status') {
          return value.length === 2
            ? null
            : `${value.map(item => `${name}=${item.toLowerCase().replace(' ', '_')}`).join('&')}`;
        }
        return `${
          name === 'number_of_bedroom' ? (value.includes('+') ? 'bedroom_above' : name) : name
        }=${
          name === 'number_of_bedroom'
            ? value.includes('+')
              ? value.replace('+', '')
              : value
            : value
        }`;
      })
      .filter(item => item)
      .join('&')}`;

    setUrl({
      ...url,
      filter: `${filter_param}`,
      param: `lower_filter=true&${filter_param}${url.sort && '&'}${url.sort}`,
    });
    router.push(`${router.route}?lower_filter=true&${filter_param}${url.sort && '&'}${url.sort}`);
    return onClose();
  };

  return (
    <>
      <Button
        alignSelf="flex-end"
        bg="#fff"
        fontWeight="400"
        fontSize="14px"
        lineHeight="18px"
        color="#191919"
        width={{md: "144px"}}
        height="48px"
        border="1px solid #E4E4E4"
        borderRadius={{ base: 'full', md: "12px"}}
        _hover={{
          bg: '#fff',
        }}
        onClick={onOpen}
      >
        <HStack justify="center" spacing="9px">
          <Image w="18px" h="18px" src={filter_icon.src} alt="sort by icon" fontSize="10px" />{' '}
          <Text display={{ base: 'none', md: 'flex'}}>filter</Text>
        </HStack>
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent position="relative" zIndex={100} mt="70px" minW="400px" bg="#fff" p="0px">
        <HStack
            mb="20px"
            py="12px"
            h="49.699px"
            bg="#F5F5F5"
            px="29px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Heading fontFamily='Euclid Circular B' fontSize="18.9px" fontWeight="700">
              Filter
            </Heading>
            <HStack align="center" justify="space-between">
              <Text
                onClick={() => {
                  setSearch('');
                  setFilteredListings(listings);
                  return handleReset();
                }}
                as="span"
                color="#4545FE"
                cursor="pointer"
                fontSize="14px"
                fontWeight="300"
              >
                Reset
              </Text>

              <HStack spacing="15px">
                <VStack
                  position="relative"
                  justify="center"
                  align="center"
                  w="30px"
                  h="30px"
                  borderRadius="5px"
                  transition="0.3s ease-in-out"
                  _hover={{
                    width: '30px',
                    height: '30px',
                  }}
                >
                  <DrawerCloseButton
                    right="0px"
                    left="0px"
                    my="auto"
                    color="#000"
                    top="0"
                    bottom="0"
                  />
                </VStack>
              </HStack>
            </HStack>
          </HStack>
          <DrawerBody px="25px">
            <VStack spacing="14px" w="full">
              <VStack borderBottom="solid 1px #E4E4E4" spacing="none" w="full" pb="5px">
                <Heading fontFamily='Euclid Circular B' mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Listing
                </Heading>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Image src={searchIcon.src} alt="seacrh icon" />}
                  />
                  <Input
                    type="text"
                    border="solid 1px #606060"
                    borderRadius="10px"
                    h="39px"
                    px="10px"
                    value={search}
                    onChange={handleSearch}
                  />
                </InputGroup>
                <CheckboxGroup
                  w="full"
                  onChange={e => handleCheck(e, 'listing[]')}
                  value={toBeFiltered.listing}
                >
                  <Wrap inner>
                    <VStack px="5px" spacing="26px" w="full" align="flex-start" h="full">
                      {filteredListings.map((item, idx) => (
                        <Checkbox key={idx} value={item}>
                          <Text fontSize="14px" fontWeight="400">
                            {item}
                          </Text>
                        </Checkbox>
                      ))}
                    </VStack>
                  </Wrap>
                </CheckboxGroup>
              </VStack>

              <VStack borderBottom="solid 1px #E4E4E4" spacing="none" w="full" pb="12px">
                <Heading fontFamily='Euclid Circular B' mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Payment type
                </Heading>
                <CheckboxGroup
                  w="full"
                  onChange={e => handleCheck(e, 'payment_plan')}
                  value={toBeFiltered.payment_plan}
                >
                  <VStack spacing="26px" w="full" align="flex-start" h="full">
                    {payment.map((item, idx) => (
                      <Checkbox key={idx} value={item}>
                        <Text fontSize="14px" fontWeight="400">
                          {item}
                        </Text>
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </VStack>
              <VStack
                spacing="none"
                w="full"
                pb="5px"
                borderBottom="solid 1px #E4E4E4"
              >
                <Heading fontFamily='Euclid Circular B' mb="12px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Status
                </Heading>

                <CheckboxGroup
                  w="full"
                  onChange={e => handleCheck(e, 'status')}
                  value={toBeFiltered.status}
                >
                  <VStack spacing="26px" w="full" align="flex-start" h="full">
                    {status.map((item, idx) => (
                      <Checkbox key={idx} value={item}>
                        <Text fontSize="14px" fontWeight="400">
                          {item}
                        </Text>
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </VStack>
              {isFractional ? (
                <HStack
                  pr="26px"
                  pb="20px"
                  w="full"
                  align="flex-start"
                  justify="space-between"
                >
                  <VStack align="flex-start" spacing="9px">
                    <Heading fontFamily='Euclid Circular B' fontSize="14px" fontWeight="600">
                      Fractional
                    </Heading>
                    <Switch
                      name="fractional"
                      isChecked={toBeFiltered.fractional}
                      onChange={handleChange}
                    />
                  </VStack>
                </HStack>
              ) : null}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onClick={applyFilter}
              w="full"
              h="36.6px"
              borderRadius="8.113px"
              bg={'#4545FE'}
              color={'#FFFFFF'}
              fontWeight={'400'}
              fontSize={'18px'}
              _hover={{
                shadow: 'md',
              }}
              _active={{
                opacity: 0.8,
              }}
            >
              Apply Filter
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filter;

const Wrap = styled.div`
  overflow: auto;
  width: 100%;
  height: ${prop => (prop.inner ? '142px' : '350px')};
  //   background: ${prop => prop.inner && 'red'};
  margin-top: ${prop => prop.inner && '16px'};

  &::-webkit-scrollbar {
    width: ${prop => (prop.inner ? '6px' : '9px')};

    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    background-color: darkgrey;
    // outline: 1px solid slategrey;
  }
`;
