/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { fetchAllListingBundleid } from "../../../api/agents";
import { useQuery } from "react-query";
import {
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useLocalStorage from "utils/hooks/useLocalStorage";

export default function ListingInfo({ listing, listingId, formik }) {
  const [Unit, setUnit] = useState("");

  const { data, isError, isLoading } = useQuery(
    ["allbundlesAgent", listingId],
    () => fetchAllListingBundleid(listingId),
    {
      enabled: !!listingId,
    }
  );

  useEffect(() => {
    formik.setValues({ ...formik.values, bundle_id: "" });
  }, [listingId]);

  return (
    <Menu matchWidth>
      <MenuButton
        bg={"white"}
        border={"1px solid #E4E4E4"}
        as={Button}
        rightIcon={<ChevronDownIcon />}
        w={"full"}
        _active={{
          bg: "white",
        }}
        textAlign={"left"}
        justifyContent={"flex-start"}
        color={"#606060"}
        fontWeight={400}
        _hover={{ bg: "#fff" }}
      >
        {Unit}
      </MenuButton>
      <MenuList minH={`70px`}>
        {isLoading ? (
          <Center h="70px">
            <Spinner color="black" />{" "}
          </Center>
        ) : !listingId ? (
          <MenuItem isDisabled>Please select a listing first</MenuItem>
        ) : isError ? (
          <MenuItem isDisabled>An error occured while loading</MenuItem>
        ) : data.data.results.length ? (
          data.data.results.map((unit, num) => (
            <MenuItem
              key={num}
              value={Number(`${unit.id}`)}
              onClick={(e) => {
                formik.setFieldValue("bundle_id", e.target.value);
                setUnit(unit.unit_title);
              }}
            >
              {unit.unit_title}
            </MenuItem>
          ))
        ) : (
          <MenuItem isDisabled>no available listing</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
