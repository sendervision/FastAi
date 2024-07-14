import { Dimensions, Image, StyleSheet } from "react-native";
import { LightBox } from "@alantoa/lightbox";

const { width, height } = Dimensions.get("window");
const IMG_LAYOUT = {width: width - 10, height: width}

export function ImageComponent({
  source,
  containerStyle = {},
  style = {},
  imgWidth,
  imgHeight,
  imgLayout = IMG_LAYOUT,
}) {
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
      />
    </LightBox>
  );
}
