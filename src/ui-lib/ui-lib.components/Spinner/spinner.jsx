import { Center, Image, Stack, useTheme } from "@chakra-ui/react";
import LoadingSpinner from "images/animated_icons/loader.gif";
export const Spinner = ({ noAbsolute, absoluteStyle, size, ...rest }) => {
  const theme = useTheme();

  return noAbsolute ? (
    <Stack align="center" justify="center" minH={size || "300px"} flex={1}>
      <Image
        src={LoadingSpinner.src}
        boxSize="15rem"
        alt="loading spinner"
        filter={theme.theme_name !== "light" ? "invert(1)" : ""}
      />
    </Stack>
  ) : (
    <Center h="80vh">
      <Image
        src={LoadingSpinner.src}
        boxSize="15rem"
        alt="loading spinner"
        filter={theme.theme_name !== "light" ? "invert(1)" : ""}
      />
    </Center>
  );
};
