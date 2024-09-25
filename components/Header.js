import * as React from "react";

import { StyleSheet, Pressable, Text, View,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Header = ({ title, onBack }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => {onBack ? onBack() : navigation.navigate("Home")}}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/images/back-button.png")}
          />
        </Pressable>
        <Text style={styles.heading}>{title}</Text>
      </View>
      <View style={[styles.logoContainer1, styles.logoContainerFlexBox1]}>
        <Image
          style={[styles.pasigCitySealLogo2Icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/images/pasig-seal.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  backButton: {
    width: 24,
    height: 24,
  },
  heading: {
    fontSize: FontSize.size_5xl,
    letterSpacing: 3,
    fontFamily: FontFamily.montserratBold,
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
  logoContainer: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  pasigCitySealLogo2Icon: {
    maxWidth: "100%",
    maxHeight: "100%",
    flex: 1,
    alignSelf: "stretch",
  },
  logoContainer1: {
    width: 60,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  header: {
    backgroundColor: Color.colorPrimary,
    height: 80,
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_lg,
    paddingVertical: Padding.p_3xs,
    zIndex: 2,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
});

export default Header;
