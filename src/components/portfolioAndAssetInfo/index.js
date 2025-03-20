import React, { useState } from "react";
import EquityInfo from "./screens/assetInfoScreens/equityInfo";
import AllocationForAssetInfo from "./screens/assetInfoScreens/allocationForAssetInfo";
import PacketsForAsset from "./screens/assetInfoScreens/packetsForAsset";
import MakeADepositToAnAsset from "./screens/assetInfoScreens/makeADepositToAnAsset";
import PaymentBreakdownForAssetInfo from "./screens/assetInfoScreens/paymentBreakdownForAssetInfo";
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchEquity, fetchUserEquity } from "../../api/listing";
import Portfolio from "./screens/Portfolio";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";

const PortfolioAndAssetProfile = ({
  isOpen,
  onClose,
  onNotOpen,
  onDrawerOpen,
}) => {
  const defaultScrn = "portfolio";
  const [screen, setScreen] = useState(defaultScrn);
  const [amountToPay, setAmountToPay] = useState("");
  const [equityId, setEquityId] = useState(0);
  const [isBelowMd] = useMediaQuery("(max-width: 767px)");

  const LIST_OF_PORTFOLIO = useInfiniteQuery({
    queryKey: ["infinitePaidAssets", "PAID"],
    queryFn: ({ pageParam = `PAID&page=1` }) => {
      return fetchUserEquity(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      const maxPageNumber = Math.ceil(lastPage?.data?.count / 10);
      const nextPageNumber = pages.length + 1;
      return nextPageNumber <= maxPageNumber
        ? `PAID&page=${nextPageNumber}`
        : undefined;
    },
  });

  const arrayData = LIST_OF_PORTFOLIO?.data?.pages?.flatMap((assetsData) =>
    assetsData?.data?.results?.map((item) => item)
  );

  const { data, isLoading, isError, refetch } = useQuery(
    ["fetchUserEquity", equityId],
    () => fetchEquity(equityId),
    { enabled: !!equityId }
  );

  const info = data?.data;

  const handleScreen = (scrn) => () => {
    return setScreen(scrn);
  };

  const displayAssetInfoScreens = (scrn) => {
    switch (scrn) {
      case "portfolio":
        return (
          <Portfolio
            setEquityId={setEquityId}
            handleScreen={setScreen}
            LIST_OF_PORTFOLIO={LIST_OF_PORTFOLIO}
          />
        );
      case "asset info":
        return (
          <EquityInfo
            isLoading={isLoading}
            refetch={refetch}
            setEquityId={setEquityId}
            info={info}
            handleScreen={handleScreen}
            onNotOpen={onNotOpen}
            onDrawerOpen={onDrawerOpen}
            setAmountToPay={setAmountToPay}
            arrayData={arrayData}
            onClose={onClose}
          />
        );
      case "allocation":
        return (
          <AllocationForAssetInfo
            equity={info}
            refetch={refetch}
            handleParentScreen={handleScreen}
            onClose={onClose}
          />
        );
      case "home owners packet":
        return (
          <PacketsForAsset
            equityId={info?.id}
            handleScreen={handleScreen}
            onNotOpen={onNotOpen}
            onDrawerOpen={onDrawerOpen}
          />
        );
      case "make a deposit":
        return (
          <MakeADepositToAnAsset
            refetch={refetch}
            info={info}
            handleScreen={handleScreen}
            amountToPay={amountToPay}
          />
        );
      case "payment breakdown":
        return (
          <PaymentBreakdownForAssetInfo
            info={info}
            isLoading={isLoading}
            handleScreen={handleScreen}
            onNotOpen={onNotOpen}
            onClose={onClose}
          />
        );
      default:
        return (
          <Portfolio
            setEquityId={setEquityId}
            handleScreen={setScreen}
            LIST_OF_PORTFOLIO={LIST_OF_PORTFOLIO}
          />
        );
    }
  };
  return (
    <>
      {isBelowMd ? (
        <Drawer
          placement={"bottom"}
          isOpen={isOpen}
          onClose={onClose}
          autofocus={false}
          onCloseComplete={() => setScreen("portfolio")}
        >
          <DrawerOverlay />
          <DrawerContent
            maxW="full"
            p="0 !important"
            bg="card_bg"
            bottom={"0 !important"}
            right={{ base: "0", lg: "24px !important" }}
            w="full"
            h={"full"}
            maxH={screen === "portfolio" ? "410px" : "100vh"}
            top="unset !important"
            borderTopRadius={screen === "portfolio" ? "1rem" : 0}
          >
            {displayAssetInfoScreens(screen)}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          placement={screen === "portfolio" ? "bottom" : "right"}
          isOpen={isOpen}
          onClose={onClose}
          autofocus={false}
          onCloseComplete={() => setScreen("portfolio")}
          scrollBehavior="outside"
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW={{ base: "40rem", lg: "48rem" }}
            minH="85rem"
            px="0"
            py="0"
            position={`fixed`}
            right={`9.3rem`}
            bottom={"calc(10vh - 7.5rem)"}
            h="fit-content"
            maxH="85rem"
            rounded={0}
          >
            {displayAssetInfoScreens(screen)}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default PortfolioAndAssetProfile;
