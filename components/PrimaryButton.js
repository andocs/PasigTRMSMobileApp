import { StyleSheet, View, Text, Pressable, ActivityIndicator } from "react-native";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";

const PrimaryButton = ({ onPress, text, loading }) => {
  return (
    <View style={[styles.button, styles.buttonContainerFlexBox]}>
      <Pressable
        style={[styles.stateLayer, styles.buttonContainerFlexBox]}
        onPress={onPress}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.labelText}>{text}</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Border.br_3xs,
    height: 42,
    overflow: "hidden",
    backgroundColor: Color.colorPrimary,
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
    color: "white",
    fontFamily: FontFamily.interBlack,
  },
});

export default PrimaryButton;
