import { useTheme } from "@chakra-ui/react";
import EmptyState from "./empty-state";

export const AccountErrorState = ({ isError }) => {
  const theme = useTheme();
  return (
    <EmptyState
      border="1px solid"
      borderColor={
        theme.theme_name !== "light" ? "matador_border_color.200" : "shade"
      }
      bg={theme.theme_name !== 'light' ? 'matador_background.100' : 'card_bg'}
      rounded={0}
      icon
      gap={0}
      letterSpacing="0.14px"
      text={
        isError ? "Error Generating Account Number" : "No account number found"
      }
      height="12.5rem"
      color={theme.theme_name !== "light" ? "text" : "#525252"}
      textSize="14px"
      headerStyle={{
        fontFamily: "Liberation Sans",
        fontSize: "20px",
        fontWeight: 700,
        letterSpacing: "1.2px",
        textTransform: "uppercase",
      }}
    />
  );
};
