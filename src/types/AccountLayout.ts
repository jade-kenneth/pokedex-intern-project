import React, { JSXElementConstructor, ReactElement } from "react";
export interface AccountLayoutProps {
  thumbnail: StaticImageData;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  heading?: string;
}
