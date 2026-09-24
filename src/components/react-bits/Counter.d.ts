import type { CSSProperties } from "react";

export default function Counter(props: {
  value: number;
  fontSize?: number;
  padding?: number;
  places?: Array<number | ".">;
  gap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColor?: string;
  fontWeight?: string | number;
  containerStyle?: CSSProperties;
  counterStyle?: CSSProperties;
  digitStyle?: CSSProperties;
  gradientHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  topGradientStyle?: CSSProperties;
  bottomGradientStyle?: CSSProperties;
}): JSX.Element;
