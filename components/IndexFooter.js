import { StyleSheet, View, Image } from "react-native";
import { Color } from "../GlobalStyles";

const IndexFooter = () => {
  return (
    <View style={styles.footer}>
      <Image
        style={styles.cityScape}
        source={require("../assets/images/pasig_cityscape.png")}
      />
      <Image
        style={styles.wordMark}
        contentFit="cover"
        source={require("../assets/images/pasig-wordmark-white-full.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorPrimary,
    zIndex: 0,
    width: "100%",
    height: 100,
    position: "relative",
    overflow: "hidden",
  },
  cityScape: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  wordMark: {
    position: "absolute",
    width: 100,
    height:75
  },
});

export default IndexFooter;
