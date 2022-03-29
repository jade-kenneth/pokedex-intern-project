import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import client from "src/apollo/apollo-client";

import "@fontsource/inter";
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({
  colors: {
    brand: {
      50: "#44337A",
      100: "#B794F4",
      500: "#B794F4", // you need this
    },

    default: "white",
    primary: "#FFD12D",
    secondary: "#1F2937",
    bg: "#111827",
    headerBgColor: "#1F2937",
    tertiary: "#60A5FA",
  },
  sizes: {
    container: {
      lg: "85%",
      md: "65%",
    },
  },
  config,
});
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
