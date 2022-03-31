import React, { useEffect, useState } from "react";
import {
  Box,
  Image as CustomImage,
  ImageProps as CustomImageProps,
} from "@chakra-ui/react";

interface ImageProps {
  src: string;
  /**
   *
   * Displayed while the image is still loading
   *
   */
  loader?: JSX.Element | string;
  /**
   *
   * The fallback image url.
   * Image will result to error if fallback url does not exist
   *
   */
  fallbackImage?: string;
}

const previouslyLoadedImage: string[] = [];

const ImageWithFallback = ({
  src,
  loader,
  fallbackImage,
  ...props
}: ImageProps & Omit<CustomImageProps, "fallbackImage">) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (previouslyLoadedImage.includes(src)) return setLoading(false);

    const image = new Image();
    image.src = src;
    image.onload = () => {
      previouslyLoadedImage.push(src);
      setLoading(false);
    };

    image.onerror = () => {
      setError(true);
      setLoading(false);
    };

    return () => {
      setLoading(true);
      setError(false);

      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return (
    <Box position={"relative"}>
      {!!loading && (
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
        >
          {loader}
        </Box>
      )}
      {!loading && (
        <CustomImage
          src={!error ? src : fallbackImage}
          height={!error ? "200px" : "50px"}
          width={!error ? "100px" : "50px"}
          top={error ? "50%" : ""}
          left={error ? "50%" : ""}
          loading="lazy"
          {...props}
        />
      )}
    </Box>
  );
};

export default ImageWithFallback;
