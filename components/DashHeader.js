import { StyleSheet, Text, View, Image } from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const DashHeader = () => {
  return (
    <View style={styles.header}>
      <View style={[styles.logoContainer, styles.logoContainerFlexBox]}>
        <Image
          style={styles.pasigWhiteIcon}
          contentFit="cover"
          source={require("../assets/images/pasig-wordmark-white.png")}
        />
        <Text style={styles.trms}>TRMS</Text>
      </View>
      <View style={[styles.logoContainer1, styles.logoContainerFlexBox]}>
        <Image
          style={[styles.pasigCitySealLogo2Icon, styles.bodyFlexBox]}
          contentFit="cover"
          source={require("../assets/images/pasig-seal.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    width: '100%',
    paddingHorizontal: Padding.p_lg,
    paddingVertical: Padding.p_3xs,
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: Color.colorPrimary,
  },
  logoContainerFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden",
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row",
  },
  pasigWhiteIcon: {
    marginTop: 7,
    width: 101,
    height: 45,
  },
  trms: {
    fontSize: FontSize.size_5xl,
    letterSpacing: 3,
    fontFamily: FontFamily.bigShouldersDisplayRegular,
    color: Color.schemesOnPrimary,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    marginLeft: 10,
  },
  logoContainer1: {
    width: 60,
  },
  pasigCitySealLogo2Icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
    alignSelf: "stretch",
  },
  bodyFlexBox: {
    alignSelf: "stretch",
    overflow: "hidden",
    flex: 1,
  },
});

export default DashHeader;
