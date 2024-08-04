import { StyleSheet, View } from "react-native";
import HeadContainer from "../components/HeadContainer";
import MainContainer from "../components/MainContainer";
import AnnouncementsContainer from "../components/AnnouncementsContainer";
import { Color, Padding, Border } from "../GlobalStyles";
import DashHeader from "../components/DashHeader";
import { ScrollView } from "react-native-gesture-handler";

const Dashboard = ({user}) => {
  return (
    <View style={styles.dashboard}>
      <DashHeader />
      <View style={styles.body}>
        <ScrollView style={{width:'100%'}}>
          <HeadContainer user={user}/>
          <MainContainer />
          <AnnouncementsContainer />
        </ScrollView>
      </View>
    </View>
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
    width:'100%',
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
