import {AbsoluteCenter, Center, resolveStyleConfig, useTheme} from '@chakra-ui/react';
import {Oval} from 'react-loader-spinner';
import {appCurrentTheme} from '../../../utils/localStorage';
import {LIGHT} from '../../../constants/names';
import { useLightenHex } from 'utils/lightenColorShade';
const primary = '#DDB057';
const primaryShade = '#DAB91F88';

export const Spinner = ({noAbsolute, absoluteStyle, size, ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const {lightenHex} = useLightenHex(primaryColor)
  return noAbsolute ? (
    <RegularSpinner
      thickness="10px"
      speed="0.65s"
      emptyColor="gray.200"
      color={lightenHex(60)}
      size={size || '100px'}
      {...resolveStyleConfig}
    />
  ) : (
    <OvalLoader absoluteStyle={absoluteStyle} {...rest} />
  );
};

export const OvalLoader = ({absoluteStyle, ...rest}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const {lightenHex} = useLightenHex(primaryColor)

  return (
    <AbsoluteCenter color={`text`} {...absoluteStyle}>
      <Oval
        height={90}
        width={90}
        // color={primary}
        color={primaryColor}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        // secondaryColor={primaryShade}
        secondaryColor={'transparent'}
        strokeWidth={2}
        strokeWidthSecondary={2}
        {...rest}
      />
    </AbsoluteCenter>
  );
};
export const RegularSpinner = ({ size }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;

  return (
    <Center color="text">
      <Oval
        height={size || 80}
        width={size || 80}
        color={primaryColor}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={'transparent'}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </Center>
  );
};
