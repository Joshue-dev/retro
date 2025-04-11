import {
  Box,
  Flex,
  Grid,
  Skeleton,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchAllUnits } from "../../../api/listing";
import { Spinner } from "../../../ui-lib";
import ErrorState from "../../../components/appState/error-state";
import { UnitCard } from "@/components/cards/UnitCard";
import { colors } from "constants/names";

const AllUnits = ({ info }) => {
  const projectId = info?.id;
  const { data, isError, isLoading } = useQuery(
    ["fetchAllUnits", projectId],
    () => fetchAllUnits(parseInt(projectId)),
    { enabled: !!projectId }
  );

  return (
    <Box w={"100%"}>
      <Text
        fontSize={{ base: "2rem", lg: "3.2rem" }}
        lineHeight={{ base: "2.0rem", lg: "4.0rem" }}
        fontWeight={600}
        color="matador_text.200"
        mb={{ base: `1.5rem`, md: `4.0rem` }}
      >
        Available Units
      </Text>

      {isLoading ? (
        <CardLoadingState />
      ) : isError ? (
        <ErrorState />
      ) : (
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }}
          gap={{ base: '16px', md: '20px' }}
        >
          {data?.data?.results?.map((data, i) => (
            <UnitCard key={i} data={data} info={info} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllUnits;

const CardLoadingState = () => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      gap={{ base: "12px", md: "30px" }}
    >
      {Array.from({ length: 4 }).map((idx) => {
        return (
          <Skeleton
            h="679.048px"
            key={idx}
            startColor={colors?.[Math.random() * 3]}
            endColor={colors?.[Math.random() * 3]}
          />
        );
      })}
    </Stack>
  );
};
