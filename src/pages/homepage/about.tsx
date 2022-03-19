import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  VStack,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { MdArrowRight } from "react-icons/md";
import Layout1 from "src/components/layout/layout-1/Layout1";
import profile from "public/backgrounds/signupBg.png";
import TabComponent from "src/components/About/TabComponent";
const About = () => {
  return (
    <Box mt={"1.375rem"} w={"container.lg"} mx="auto">
      <HStack mb={"2.625rem"}>
        <Text>Home</Text>
        <Icon as={MdArrowRight} />
        <Text>Pokemon details</Text>
      </HStack>
      <Stack align="flex-start" direction={"row"} spacing={"4.313rem"}>
        {/** Profile*/}
        <VStack spacing="2.188rem">
          <Stack w={"20.313rem"} h={"24.313rem"} position="relative">
            <Image src={profile} alt="profile" layout="responsive" />
          </Stack>

          <HStack align="center" spacing={"2.225rem"}>
            <Icon as={IoIosArrowDropleft} fontSize="2.5rem"></Icon>
            <Grid
              templateRows={"repeat(2, 3.563rem)"}
              templateColumns={"repeat(3, 3.563rem)"}
              columnGap={"0.5rem"}
              rowGap={"1.125rem"}
            >
              <Image src={profile} alt="profile" />
              <Image src={profile} alt="profile" />
              <Image src={profile} alt="profile" />
              <Image src={profile} alt="profile" />
              <Image src={profile} alt="profile" />
              <Image src={profile} alt="profile" />
            </Grid>
            <Icon as={IoIosArrowDropright} fontSize="2.5rem"></Icon>
          </HStack>
        </VStack>
        {/** POKEMON NAME */}
        <Stack width="100%">
          <VStack align="flex-start" spacing={"1rem"} mb={"3.25rem"}>
            <Heading fontSize="2rem">Pokemon name</Heading>
            <Button bg="red" py={"0.5rem"} px={"1rem"} borderRadius="50px">
              Fire type
            </Button>
          </VStack>
          <TabComponent />
        </Stack>
      </Stack>
    </Box>
  );
};

export default About;
About.getLayout = (page: React.ComponentType<{}> | JSX.Element) => {
  return <Layout1>{page}</Layout1>;
};
