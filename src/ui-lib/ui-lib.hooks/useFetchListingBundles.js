import { useQuery } from "react-query";
// import { fetchAllListingBundles } from "/src/api/listings";
import { AnimatedLoader } from "/src/components";
import { SwalError } from "/src/ui-lib/ui-lib.components";
import { useToast } from "@chakra-ui/react";
import { fetchAllListingBundles } from "../../api/agents";
import useLocalStorage from "utils/hooks/useLocalStorage";

export const useFetchListingBundles = (id) => {
  const toast = useToast();

  const { data, isError, isLoading } = useQuery(["listingBundles", id], () =>
    fetchAllListingBundles(id)
  );
  if (isLoading) {
    return <AnimatedLoader />;
  }
  if (isError) {
    if (isError) {
      return toast({
        title: `Kindly refresh the page' `,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return {
    listingBundles: data.data.results,
    isLoading,
    isError,
  };
};
