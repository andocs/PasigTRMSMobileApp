import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import { Color, Padding, FontFamily, FontSize } from "./GlobalStyles";

import TerminalTab from "./screens/TerminalTab";
import ForgotPassword from "./screens/ForgotPassword";
import RoutesTab from "./screens/RoutesTab";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ProfileTab from "./screens/ProfileTab";
import LandingScreen from "./screens/LandingScreen";
import QRTab from "./screens/QRTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ForgotPasswordEmail from "./screens/ForgotPasswordEmail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabs = ({ user }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let label;
          if (route.name === "Home") {
            iconSource = focused
              ? require("./assets/images/home.png")
              : require("./assets/images/home-outline.png");
            label = "Home";
          } else if (route.name === "TerminalTab") {
            iconSource = focused
              ? require("./assets/images/terminal.svg")
              : require("./assets/images/terminal-outline.svg");
            label = "Terminals";
          } else if (route.name === "QRTab") {
            iconSource = focused
              ? require("./assets/images/qr.png")
              : require("./assets/images/qr-outline.png");
            label = "QR";
          } else if (route.name === "RoutesTab") {
            iconSource = focused
              ? require("./assets/images/route.svg")
              : require("./assets/images/route-outline.svg");
            label = "Routes";
          } else if (route.name === "ProfileTab") {
            iconSource = focused
              ? require("./assets/images/profile.png")
              : require("./assets/images/profile-outline.png");
            label = "Profile";
          }

          return (
            <View style={styles.tabContainer}>
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.focusedIconContainer,
                ]}
              >
                <Image
                  source={iconSource}
                  style={[
                    { width: "60%", height: "60%" },
                    focused && { width: "45%", height: "45%" },
                  ]}
                />
              </View>
              <Text style={[styles.label, !focused && { display: "none" }]}>
                {label}
              </Text>
            </View>
          );
        },
        tabBarActiveTintColor: Color.schemesOnPrimary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: Color.colorPrimary,
          height: 100,
          paddingHorizontal: Padding.p_lg,
          paddingVertical: Padding.p_3xs,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" children={() => <Dashboard user={user} />} />
      <Tab.Screen name="TerminalTab" component={TerminalTab} />
      <Tab.Screen name="QRTab" component={QRTab} />
      <Tab.Screen name="RoutesTab" component={RoutesTab} />
      <Tab.Screen name="ProfileTab" children={() => <ProfileTab user={user} />} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [hideSplashScreen, setHideSplashScreen] = useState(true);

  useEffect(() => {
    const checkUserInfo = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
      setHideSplashScreen(false);
    };
    checkUserInfo();
  }, []);

  const handleUserLogin = (userInfo) => {
    setUser(userInfo);
  };

  const [fontsLoaded, error] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "BigShouldersDisplay-Regular": require("./assets/fonts/BigShouldersDisplay-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="DashboardTabs"
            children={() => <DashboardTabs user={user} />}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            children={() => <Login onUserLogin={handleUserLogin} />}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPasswordEmail"
            component={ForgotPasswordEmail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
    width: 40,
    height: 40,
  },
  focusedIconContainer: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  label: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: FontSize.size_3xs,
    letterSpacing: 1,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.schemesOnPrimary,
  },
});

export default App;
