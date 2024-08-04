import React, { useMemo } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Padding, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const IconButton = ({
  icon,
  iconButtonPosition,
  iconButtonHeight,
  iconButtonAlignSelf,
  iconOverflow,
}) => {
  const iconButtonStyle = useMemo(() => {
    return {
      ...getStyleValue("position", iconButtonPosition),
      ...getStyleValue("height", iconButtonHeight),
      ...getStyleValue("alignSelf", iconButtonAlignSelf),
    };
  }, [iconButtonPosition, iconButtonHeight, iconButtonAlignSelf]);

  const iconStyle = useMemo(() => {
    return {
      ...getStyleValue("overflow", iconOverflow),
    };
  }, [iconOverflow]);

  return (
    <View style={[styles.stylestandardStateenabled, iconButtonStyle]}>
      <View style={[styles.container, styles.containerFlexBox]}>
        <View style={[styles.stateLayer, styles.containerFlexBox]}>
          <Image
            style={[styles.icon, iconStyle]}
            contentFit="cover"
            source={icon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  stateLayer: {
    padding: Padding.p_5xs,
  },
  container: {
    borderRadius: Border.br_81xl,
    overflow: "hidden",
  },
  stylestandardStateenabled: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
