import { Button as ChakraButton, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const CustomizableButton = ({ bg, background, bgColor, children, ...rest }) => {
  return (
    <ChakraButton
      borderRadius={0}
      fontWeight={500}
      as={motion.button}
      bg={bg || background || bgColor}
      _hover={bg || background || bgColor}
      _focus={bg || background || bgColor}
      _active={bg || background || bgColor}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
};
