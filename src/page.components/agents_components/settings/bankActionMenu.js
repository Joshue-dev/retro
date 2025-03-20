import React, {useState} from 'react';
import houseIcon from '/src/images/icons/bankhouse.svg';
import {HiOutlinePlus} from 'react-icons/hi';
import {
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import AddBankDetailsForAgents from './AddBankDetailsForAgents';
import {RemoveBankDetails} from './RemoveBankDetails';
import threeDot from '/src/images/icons/threeDot.svg';

export const BankActionMenu = ({refetch, id}) => {
  const {isOpen: addBankIsopen, onClose: addBankOnclose, onOpen: addBankOnpen} = useDisclosure();

  const {
    isOpen: removeBankIsopen,
    onClose: removeBankOnclose,
    onOpen: removeBankOnpen,
  } = useDisclosure();

  return (
    <Menu closeOnSelect>
      <MenuButton aria-label="Options" variant="outline">
        <Image src={threeDot.src} width="80%" cursor="pointer" />
      </MenuButton>
      <MenuList borderRadius={'16px'}>
        <MenuItem onClick={() => removeBankOnpen()}>
          <Text
            fontWeight="400"
            fontSize="16px"
            lineHeight="20px"
            textAlign="center"
            color="#3D3D3D"
            p={'10px'}
          >
            Remove
          </Text>
          <RemoveBankDetails
            isOpen={removeBankIsopen}
            onClose={removeBankOnclose}
            refetch={refetch}
            id={id}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
