import {Box} from '@chakra-ui/react';
import {useTheme} from '@emotion/react';

export const HomeIconForAllocation = ({baseColor, ...style}) => {
  const theme = useTheme();
  const primaryColor = baseColor || theme.colors.primary;
  return (
    <Box role="img" aria-Label="home icon" {...style}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="vuesax/bold/home-2">
          <g id="home-2">
            <path
              id="Vector"
              d="M53.4361 18.1872L38.0761 7.44048C33.8894 4.50715 27.4627 4.66715 23.4361 7.78715L10.0761 18.2138C7.4094 20.2938 5.30273 24.5605 5.30273 27.9205V46.3205C5.30273 53.1205 10.8227 58.6671 17.6227 58.6671H46.3694C53.1694 58.6671 58.6894 53.1471 58.6894 46.3471V28.2672C58.6894 24.6672 56.3694 20.2405 53.4361 18.1872ZM33.9961 48.0005C33.9961 49.0938 33.0894 50.0005 31.9961 50.0005C30.9027 50.0005 29.9961 49.0938 29.9961 48.0005V40.0005C29.9961 38.9072 30.9027 38.0005 31.9961 38.0005C33.0894 38.0005 33.9961 38.9072 33.9961 40.0005V48.0005Z"
              fill={primaryColor}
            />
          </g>
        </g>
      </svg>
    </Box>
  );
};
