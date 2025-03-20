import {
  Button,
  Center,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react';
import {ChevronDownIcon} from '@chakra-ui/icons';

const MenuForListings = ({err, listings, isLoading, setListingId, setListingName, listingName}) => {
  return (
    <Menu matchWidth>
      <MenuButton
        bg={'white'}
        border={'1px solid #E4E4E4'}
        as={Button}
        rightIcon={<ChevronDownIcon />}
        w={'full'}
        _active={{
          bg: 'white',
        }}
        textAlign={'left'}
        justifyContent={'flex-start'}
        color={'#606060'}
        fontWeight={400}
        _hover={{bg: '#fff'}}
      >
        {listingName ? listingName : ''}
      </MenuButton>
      <MenuList minH={`70px`}>
        {isLoading ? (
          <Center h="70px">
            <Spinner />
          </Center>
        ) : err ? (
          <MenuItem isDisabled>An error occured while loading</MenuItem>
        ) : listings.length > 0 ? (
          listings.map((unit, num) => (
            <MenuItem
              key={num}
              onClick={() => {
                setListingId(unit?.id);
                setListingName(unit?.name);
              }}
            >
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={unit.photos[0]?.photo}
                alt="listing"
                mr="12px"
              />
              <span>{unit?.name}</span>
            </MenuItem>
          ))
        ) : (
          <MenuItem isDisabled>no available listing</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuForListings;
