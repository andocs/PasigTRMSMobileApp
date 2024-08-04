import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderBack = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.headerBackWrapper}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigate.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={24} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackWrapper: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
  }
});

export default HeaderBack;
