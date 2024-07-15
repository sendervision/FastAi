import { Dimensions, Image, StyleSheet, ImageProps, ViewProps } from "react-native";
import { LightBox } from "@alantoa/lightbox";

const { width } = Dimensions.get("window");
const IMG_LAYOUT = {width: width - 10, height: width}

interface ImageComponentType{
  source: any;
  containerStyle?: ViewProps;
  style?: ImageProps;
  imgWidth: number;
  imgHeight: number;
  imgLayout?: {width: number, height: number};
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

export function ImageComponent({
  source,
  containerStyle = {},
  style = {},
  imgWidth,
  imgHeight,
  imgLayout = IMG_LAYOUT,
  onLoadStart = () => {},
  onLoadEnd = () => {},
  ...other
}: ImageComponentType) {
  return (
    <LightBox
      width={imgWidth}
      height={imgHeight}
      imgLayout={imgLayout}
      containerStyle={containerStyle}
    >
      <Image
        source={source}
        style={[style, StyleSheet.absoluteFillObject]}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        {...other}
      />
    </LightBox>
  );
}
