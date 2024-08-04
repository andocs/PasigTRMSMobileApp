import { StyleSheet, View, Text, Pressable } from "react-native";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";

const OutlineButton = ({ onPress, text }) => {
  return (
    <View style={[styles.button, styles.buttonContainerFlexBox]}>
      <Pressable
        style={[styles.stateLayer, styles.buttonContainerFlexBox]}
        onPress={onPress}>
        <Text style={styles.labelText}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Border.br_3xs,
    borderStyle: "solid",
    borderColor: Color.colorPrimary,
    borderWidth: 2,
    height: 42,
    overflow: "hidden",
    backgroundColor: Color.schemesOnPrimary,
    justifyContent: "center",
  },
  buttonContainerFlexBox: {
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  stateLayer: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_3xs,
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  labelText: {
    fontSize: FontSize.m3LabelLarge_size,
    letterSpacing: 3,
    lineHeight: 20,
    fontWeight: "900",
    textAlign: "center",
    color: Color.colorPrimary,
    fontFamily: FontFamily.interBlack,
  },
});

export default OutlineButton;
