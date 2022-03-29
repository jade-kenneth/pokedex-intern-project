import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Link,
} from "@chakra-ui/react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ComponentType, FunctionComponent } from "react";

import Loading from "src/components/Homepage/widgets/Loading";
import SignIn from "src/pages/signin";
// eslint-disable-next-line react/display-name
const withAuth = (Component: any) => (props: any) => {
  const NewComponent = (props: any) => {
    const router = useRouter();
    const { status } = useSession();
    console.log(status);
    if (status === "loading") return <Loading type="loading" />;
    if (status === "unauthenticated") return <SignIn />;
    if (
      (status === "authenticated" && router.asPath === "/signin") ||
      (status === "authenticated" && router.asPath === "/reset") ||
      (status === "authenticated" && router.asPath === "/signup")
    ) {
      console.log("hey");
      return (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          minH="100vh"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            You can&apos;t access this by any reasons
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Go to{" "}
            <Link color="teal.500" onClick={() => router.push("/home")}>
              homepage
            </Link>
          </AlertDescription>
        </Alert>
      );
    }
    return <Component {...props} />;
  };
  console.log(props);
  return <NewComponent {...props} />;
};

export default withAuth;
