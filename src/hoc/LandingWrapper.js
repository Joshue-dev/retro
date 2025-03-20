import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { Spinner } from "../ui-lib";
import { storeDetails } from "../api/auth";
import { useQuery } from "react-query";
import useGetSession from "utils/hooks/getSession";

function LandingWrapper(Component) {
  const AuthCheck = () => {
    const router = useRouter();
    const { sessionData: user } = useGetSession("loggedIn");
    const [checked, setChecked] = useState(false);
    // const STOREINFO = useQuery(["storeInfo"], storeDetails);
    // const business_id = STOREINFO.data?.data?.business;
    const get_user = () => {
      return (
        typeof window !== "undefined" &&
        localStorage.getItem("storeDetails") &&
        JSON?.parse(localStorage?.getItem("LoggedinUser"))
      );
    };
    // useEffect(() => {
    //   localStorage.setItem("businessId", JSON.stringify(business_id));
    // }, [STOREINFO.data]);

    useEffect(() => {
      // const user = get_user();

      if (user) {
        router.push("/properties");
      } else {
        setChecked(true);
      }
    }, []);

    return (
      <div>
        {checked ? (
          <Component />
        ) : (
          <Flex justify="center" align="center" h="100vh" w="100vw">
            <Spinner />
          </Flex>
        )}
      </div>
    );
  };
  return AuthCheck;
}

export default LandingWrapper;
