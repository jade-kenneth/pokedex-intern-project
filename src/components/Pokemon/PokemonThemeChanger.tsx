import { Box, BoxProps, HTMLChakraProps, forwardRef } from "@chakra-ui/react";
import React from "react";

/**error encounter using react forwardref
 * error: Type 'ForwardedRef<PokemonThemeChangerProps & BoxProps>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
 *
 *  used forwardRef form chakra ui instead
/**src: https://chakra-ui.com/docs/components/recipes/as-prop */
const PokemonThemeChanger = forwardRef<BoxProps, "div">(
  ({ children, ...props }, ref) => {
    return (
      <>
        <Box ref={ref} {...props}>
          {children}
        </Box>
      </>
    );
  }
);
PokemonThemeChanger.displayName = "PokemonThemeChanger";
export default PokemonThemeChanger;
