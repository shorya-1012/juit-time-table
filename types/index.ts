import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DATA = {
  data: string[];
  day: string;
  time: string;
  __v: number;
  _id: number;
};
