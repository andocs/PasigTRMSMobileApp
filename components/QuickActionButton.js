import * as React from "react";
import { StyleSheet, Text, Pressable, Image } from "react-native";
import { Padding, Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const QuickActionButton = ({ icon, text, onPress }) => {
   const [containerWidth, setContainerWidth] = React.useState(0);
  return (
    <Pressable
        style={styles.buttonShadowBox}
        onPress={onPress}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setContainerWidth(width);
        }}
      >
      <Text style={styles.operator}>{text}</Text>
      <Image style={[styles.icon, containerWidth > 200 && {height: 110, width:110}]} source={icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonShadowBox: {
    position: "relative",
    width: "100%",
    flex: 1,
    minHeight: 130,
    gap: 10,
    padding: Padding.p_3xs,
    alignItems: "end",
    justifyContent: "flex-end",
    backgroundColor: Color.lighterPrimary,
    borderRadius: Border.br_9xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
  },
  icon: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    height: 80,
    width: 80,
    resizeMode: "contain",
    overflow: "hidden",
  },
  text: {
    fontSize: FontSize.m3BodySmall_size,
    letterSpacing: 3,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorPrimary,
    textAlign: "left",
    marginTop: 10,
  },
  operator: {
    position: "absolute",
    left: 12,
    top: 12,
    color: Color.colorPrimary,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
    letterSpacing: 1,
  },
});

export default QuickActionButton;
