import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { Spinner } from "../ui-lib";
import { useQuery } from "react-query";
import { storeDetails } from "../api/auth";

import useGetSession, { deliverSession } from "utils/hooks/getSession";

function Auth(Component, rest) {
  const AuthCheck = () => {
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    const { sessionData: user } = useGetSession("loggedIn");

    // const STOREINFO = useQuery(['storeInfo'], storeDetails);
    // const business_id = STOREINFO.data?.data?.business;

    // useEffect(() => {
    //   localStorage.setItem('businessId', JSON.stringify(business_id));
    // }, [STOREINFO.data]);

    useEffect(() => {
      if (user) {
        setChecked(true);
      } else {
        // router.push("/");
      }
    }, [user]);

    return (
      <div>
        {checked ? (
          <Component />
        ) : (
          <Flex justify="center" align="center" h="100vh" w="100vw">
            <Spinner {...rest} />
          </Flex>
        )}
      </div>
    );
  };
  return AuthCheck;
}

export default Auth;
