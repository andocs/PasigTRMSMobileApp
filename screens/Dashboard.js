import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import HeadContainer from "../components/HeadContainer";
import MainContainer from "../components/MainContainer";
import AnnouncementsContainer from "../components/AnnouncementsContainer";
import { Color, Padding, Border } from "../GlobalStyles";
import DashHeader from "../components/DashHeader";

const Dashboard = ({ user }) => {
  return (
    <SafeAreaView style={styles.dashboard}>
      <StatusBar hidden={true} />
      <DashHeader />
      <View style={styles.body}>
        <ScrollView style={{ width: "100%" }}>
          <HeadContainer user={user} />
          <MainContainer />
          <AnnouncementsContainer />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    overflow: "hidden",
    alignItems: "center",
    width: "100%",
    flex: 1,
    backgroundColor: Color.colorPrimary,
  },
  body: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    backgroundColor: Color.schemesOnPrimary,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_base,
    zIndex: 1,
    alignItems: "center",
    overflow: "scroll",
  },
});

export default Dashboard;
