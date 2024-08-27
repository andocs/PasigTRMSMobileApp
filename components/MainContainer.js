import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Padding } from "../GlobalStyles";
import QuickActionButton from "./QuickActionButton";

const MainContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.mainContainer, styles.containerFlexBox]}>
      <View style={[styles.quickActionContainer, styles.containerFlexBox]}>
        <View style={styles.rowContainer}>
          <QuickActionButton
            icon={require("../assets/images/bus-terminal.png")}
            text={"Terminals"}
            onPress={() => navigation.navigate("TerminalTab")}
          />
          <QuickActionButton
            icon={require("../assets/images/route-locator.png")}
            text={"Routes"}
            onPress={() => navigation.navigate("RoutesTab")}
          />
        </View>
        <View style={styles.rowContainer}>
          <QuickActionButton
            icon={require("../assets/images/qr-code.png")}
            text={"QR Code"}
            onPress={() => navigation.navigate("QRTab")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlexBox: {
    overflow: "hidden",
    alignSelf: "stretch",
  },
  quickActionContainer: {
    borderRadius: Border.br_3xs,
  },
  mainContainer: {
    paddingHorizontal: Padding.p_6xs,
    paddingVertical: Padding.p_3xs,
  },
  rowContainer: {
    justifyContent: "center",
    gap: 20,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    paddingHorizontal: Padding.p_8xs,
    paddingTop: Padding.p_base,
    paddingBottom: Padding.p_5xs,
    overflow: "hidden",
  },
});

export default MainContainer;
