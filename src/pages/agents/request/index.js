import { useQuery } from "react-query";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Text,
  useToast,
  InputRightElement,
  InputGroup,
  Input,
  Button,
} from "@chakra-ui/react";
import { fetchAgentRequest } from "../../../api/agents";
import AgentsLayoutView from "../../../page.components/agents_components/AgentLayout/View";
import { useState } from "react";
import { toastForError } from "../../../utils/toastForErrors";
import default_avatar from "/src/images/icons/default_avatar.svg";
import emptyIcon from "/src/images/icons/emptyIcon.svg";
import { SearchIcon } from "@chakra-ui/icons";
import { formatTimestamp } from "utils/formatDate";
import { RequestPagePagination } from "page.components/agents_components/request/RequestPagePagination";
import { RequestSidebar } from "page.components/agents_components/request/RequestSidebar";
import { monthDayYear } from "utils/formatDate";
import { OvalLoader } from "components/common/loaders/AnimatedLoader";
import useLocalStorage from "utils/hooks/useLocalStorage";

const RequestPage = () => {
  const tabs = ["listing_inspection", "sales_commission"];
  const [tab, setTab] = useState(tabs[0] || "");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(true);
  const limit = 10;

  const param = pending ? "?status=pending" : "";
  const { data, isError, isLoading, refetch, error } = useQuery(
    ["agent_request", param, tab],
    () => fetchAgentRequest(param)
  );

  const list_data = {
    listing_inspection:
      data?.data?.inspection_requests?.filter((el) =>
        el?.project?.constructed_by
          ?.toLowerCase()
          ?.includes(search.toLowerCase())
      ) || [],
    sales_commission:
      data?.data?.commission_requests?.filter((el) =>
        el?.property_info?.toLowerCase()?.includes(search.toLowerCase())
      ) || [],
  };

  const toast = useToast();

  toastForError(error, isError, toast);
  return (
    <AgentsLayoutView activePage="request">
      <Flex
        gap={"24px"}
        minW={"100%"}
        direction={{ base: "column", lg: "row" }}
        mb={{ base: "200px", lg: "50px" }}
        mt={{ base: `50px`, lg: "0px" }}
        w={{ base: "1000px", lg: "100%" }}
        maxW={"100%"}
      >
        <RequestSidebar
          tab={tab}
          tabs={tabs}
          changeTab={(el) => {
            setTab(el);
            setPage(1);
          }}
        />
        <Box
          flex={"1"}
          borderRadius="8px"
          border="1px solid #EAECF0"
          backgroundColor={"white"}
          textAlign={"left"}
        >
          {isLoading ? (
            <>
              <Center
                minH="70vh"
                w="100%"
                minW={{ base: "200px", sm: "500px" }}
                position={"relative"}
              >
                <OvalLoader />
              </Center>
            </>
          ) : (
            <>
              <Flex
                padding={"16px 18px"}
                justify="space-between"
                align={{ base: "flex-start", lg: "center" }}
                borderBottom="1px solid #EAECF0"
                direction={{ base: "column", lg: "row" }}
                gap="20px"
              >
                <Heading
                  fontFamily="Euclid Circular B"
                  fontSize={"18.448px"}
                  lineHeight="150%"
                  color={"#475467"}
                  textTransform={"capitalize"}
                  textAlign={"left"}
                  fontWeight={"400"}
                >
                  {tab?.split("_")?.join(" ")}
                </Heading>
                <Flex
                  gap={"10px"}
                  align="center"
                  w={{ base: "100%", lg: "max-content" }}
                >
                  {/* <FormControl
                display="flex"
                alignItems="center"
                bg={'white'}
                p={{base: '0px', lg: '16px'}}
              >
                <FormLabel htmlFor="view_pending" mb="0" fontWeight={'400'} fontSize={'14px'}>
                  View Pending
                </FormLabel>
                <Switch
                  colorScheme="teal"
                  id="view_pending"
                  isChecked={pending}
                  onChange={e => setPending(!pending)}
                />
              </FormControl> */}
                  <InputGroup alignItems="center" width="100%">
                    <Input
                      pr="4.5rem"
                      type="search"
                      color="#98A2B3"
                      background="#F5f5f5"
                      borderRadius="12px"
                      _placeholder={{
                        color: "gray.500",
                        fontsize: "12px",
                        textColor: "#919191",
                      }}
                      p={"10px 16px"}
                      placeholder="Search"
                      border={"1px solid #E4E4E4"}
                      onChange={(e) => setSearch(e.target.value)}
                      maxW={{ base: "100%", lg: "152px" }}
                      _focus={{ maxWidth: "310px" }}
                      _focusVisible={{ maxWidth: "310px" }}
                      _active={{ maxWidth: "310px" }}
                      transition={".5s"}
                    />
                    <InputRightElement>
                      <SearchIcon cursor="pointer" color="#98A2B3" />
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </Flex>
              <List minH={"60vh"} display={"flex"} flexDir={"column"}>
                {isLoading ? (
                  <Center
                    flexDir="column"
                    spacing={3}
                    mx="auto"
                    w="full"
                    h="100%"
                    py="100px"
                    flex={"1"}
                  >
                    <Center
                      mx={"auto"}
                      w={{ base: "500px", lg: "100%" }}
                      minW={{ base: "0px", lg: "500px" }}
                      maxW={"100%"}
                    >
                      <Center w="100%">
                        <OvalLoader
                          position="absolute"
                          top="20%"
                          left="44.6%"
                          h="70vh"
                        />
                      </Center>
                    </Center>
                  </Center>
                ) : list_data[tab]?.slice(limit * (page - 1), limit * page)
                    ?.length === 0 ? (
                  <Center
                    flexDir="column"
                    spacing={3}
                    mx="auto"
                    w="full"
                    h="100%"
                    py="100px"
                    flex={"1"}
                    minW={{ base: "0px", lg: "500px" }}
                  >
                    <Image alt="empty table icon" src={emptyIcon.src} />
                    <Text fontSize="20px" fontWeight="700">
                      Nothing Found
                    </Text>
                    <Text
                      w="full"
                      textAlign="center"
                      fontSize="14px"
                      fontWeight="400"
                      color="#606060"
                      mx="auto"
                    >
                      There is no request at the moment
                      {/* for{' '}
                  <b style={{textTransform: 'capitalize'}}>{tab?.split('_')?.join(' ')}</b> */}
                    </Text>
                  </Center>
                ) : (
                  list_data[tab]
                    ?.slice(limit * (page - 1), limit * page)
                    ?.map((request_data, i) => (
                      <ListItem
                        key={i}
                        py={"24px"}
                        borderBottom="1px solid #EAECF0"
                      >
                        <Flex px={{ base: "8px", lg: "16px" }} gap={"8px"}>
                          <Center>
                            <Image
                              style={{ cursor: "pointer" }}
                              mr={2}
                              h="48px"
                              w="48px"
                              src={
                                request_data?.customer?.avatar ||
                                request_data?.users?.avatar ||
                                default_avatar.src
                              }
                              alt="default_avatar"
                            />
                          </Center>
                          <Flex
                            flex="1"
                            fontSize={"14px"}
                            color="#475467"
                            lineHeight={"20px"}
                            fontWeight={"400"}
                            spacing={"3px"}
                            textAlign={"left"}
                            direction={"column"}
                          >
                            {tab === "listing_inspection" ? (
                              <Text>
                                <Link
                                  href={`/agents/users/customer_profile/${request_data?.users?.user?.id}`}
                                  color="#4545FE"
                                  textTransform={"capitalize"}
                                >
                                  {request_data?.users?.first_name}{" "}
                                  {request_data?.users?.last_name}
                                  &apos;s
                                </Link>{" "}
                                scheduled{" "}
                                <b style={{ textTransform: "capitalize" }}>
                                  {request_data?.tour_method}
                                </b>{" "}
                                inspection for{" "}
                                <b style={{ textTransform: "capitalize" }}>
                                  {request_data?.project?.name}{" "}
                                  {request_data?.project?.building_type},{" "}
                                  {request_data?.project?.address}
                                </b>{" "}
                                on{" "}
                                <b style={{ textTransform: "capitalize" }}>
                                  {monthDayYear(request_data?.date)}
                                </b>{" "}
                                at{" "}
                                <b style={{ textTransform: "capitalize" }}>
                                  {request_data?.time}
                                </b>
                                {request_data?.status.toLowerCase() ===
                                "pending"
                                  ? " is pending"
                                  : ` has been ${request_data?.status.toLowerCase()}`}
                                .
                              </Text>
                            ) : tab === "sales_commission" ? (
                              <Text>
                                Your commission request for{" "}
                                <Link
                                  href={`/agents/users/customer_profile/${request_data?.customer?.user?.id}`}
                                  color="#4545FE"
                                  textTransform={"capitalize"}
                                >
                                  {request_data?.customer?.first_name}{" "}
                                  {request_data?.customer?.last_name}
                                  &apos;s
                                </Link>{" "}
                                <b style={{ textTransform: "capitalize" }}>
                                  {request_data?.property_info}
                                </b>
                                {request_data?.status.toLowerCase() ===
                                "pending"
                                  ? " is pending"
                                  : ` has been ${request_data?.status.toLowerCase()}`}
                                .
                              </Text>
                            ) : (
                              "Request Description"
                            )}
                            <Text
                              display={"flex"}
                              alignItems={"center"}
                              gap={"8px"}
                            >
                              <Box
                                h="4px"
                                w="4px"
                                borderRadius={"50%"}
                                bg={"#D9D9D9"}
                              ></Box>
                              {formatTimestamp(
                                request_data?.createdAt ||
                                  request_data?.created_at ||
                                  request_data.date ||
                                  ""
                              )}
                            </Text>
                          </Flex>
                          {request_data.status === "rejected" && (
                            <Button
                              color={"white"}
                              fontSize={"12px"}
                              lineHeight={"1-0%"}
                              fontWeight={"500"}
                              bg="#191919"
                              borderRadius={"4px"}
                              padding="4px 8px"
                              height={"max-content"}
                              alignSelf={"center"}
                              _hover={{ backgroundColor: "#161616" }}
                            >
                              View Reason
                            </Button>
                          )}
                        </Flex>
                      </ListItem>
                    ))
                )}
              </List>
              {list_data[tab].length > 0 && (
                <RequestPagePagination
                  page={page}
                  limit={limit}
                  total={list_data[tab].length}
                  setPage={setPage}
                  list={list_data[tab]}
                />
              )}
            </>
          )}
        </Box>
      </Flex>
    </AgentsLayoutView>
  );
};

export default RequestPage;
