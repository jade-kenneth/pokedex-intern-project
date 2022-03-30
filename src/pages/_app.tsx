import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import client from "src/apollo/apollo-client";

import "@fontsource/inter";
import { useRouter } from "next/router";
import Loading from "src/components/Homepage/widgets/Loading";
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      // console.log(
      //   `App is changing to ${url} ${
      //     shallow ? "with" : "without"
      //   } shallow routing ${state}`
      // );
      setLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          {loading ? (
            <Loading type="loading" />
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
