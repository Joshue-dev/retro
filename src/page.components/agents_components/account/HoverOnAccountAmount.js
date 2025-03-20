import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {formatToCurrency} from '../../../utils/formatAmount';

const HoverOnAccountAmount = ({text, Textcolor, ...rest}) => {
  const {isOpen, onToggle, onClose} = useDisclosure();
  const shouldDisplayPopUp = () => {
    return /^([^,]*,[^,]*),.*$/.test(formatToCurrency(text));
  };

  return (
    <Popover placement="top" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Text
          onMouseLeave={shouldDisplayPopUp() ? onToggle : null}
          onMouseEnter={shouldDisplayPopUp() ? onToggle : null}
          w="120px"
          fontSize="16px"
          fontWeight="400"
          textAlign="start"
          color={Textcolor}
          {...rest}
        >
          {text ? formatToCurrency(text).replace(/^([^,]*,[^,]*),.*$/, '$1...') : '-'}
        </Text>
      </PopoverTrigger>

      <PopoverContent w="fit-content">
        <PopoverArrow />

        <PopoverBody boxShadow="0 1px 4px rgba(0, 0, 0, 0.08)" borderRadius="8px">
          <Text
            w="fit-content"
            fontSize="16px"
            fontWeight="400"
            textAlign="center"
            color={Textcolor}
          >
            {formatToCurrency(text)}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default HoverOnAccountAmount;
