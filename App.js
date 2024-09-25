import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, Platform } from "react-native";

import { useFonts } from "expo-font";
import { Color, Padding, FontFamily, FontSize } from "./GlobalStyles";

import TerminalTab from "./screens/TerminalTab";
import ForgotPassword from "./screens/ForgotPassword";
import RoutesTab from "./screens/RoutesTab";
import Dashboard from "./screens/Dashboard";
import MapScreen from "./screens/MapScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ProfileTab from "./screens/ProfileTab";
import LandingScreen from "./screens/LandingScreen";
import QRTab from "./screens/QRTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ForgotPasswordEmail from "./screens/ForgotPasswordEmail";
import RegistrationCode from "./screens/RegistrationCode";
import AnnouncementsScreen from "./screens/AnnouncementsScreen";
import QRGenerator from "./screens/QRGenerator";
import SelectLocationScreen from "./screens/SelectLocationScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabs = ({ user, onLogout }) => {
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
              ? require("./assets/images/terminal.png")
              : require("./assets/images/terminal-outline.png");
            label = "Terminals";
          } else if (route.name === "QRTab") {
            iconSource = focused
              ? require("./assets/images/qr.png")
              : require("./assets/images/qr-outline.png");
            label = "QR";
          } else if (route.name === "RoutesTab") {
            iconSource = focused
              ? require("./assets/images/route.png")
              : require("./assets/images/route-outline.png");
            label = "Routes";
          } else if (route.name === "MapScreen") {
            iconSource = focused
              ? require("./assets/images/map.png")
              : require("./assets/images/map-outline.png");
            label = "Map";
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
      <Tab.Screen
        name="TerminalTab"
        component={TerminalTab}
        options={{
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="QRTab"
        children={() => <QRTab user={user} />}
        options={{
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen
        name="RoutesTab"
        component={RoutesTab}
        options={{
          tabBarVisible: false, //hide tab bar on this screen
        }}
      />
      <Tab.Screen name="ProfileTab">
        {() => (
          <ProfileTab
            user={user}
            onLogout={onLogout}
            options={{
              tabBarVisible: false, //hide tab bar on this screen
            }}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="AnnouncementsScreen"
        component={AnnouncementsScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="QRGenerator"
        component={QRGenerator}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
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

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userInfo");
    setUser(null);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="DashboardTabs"
              children={() => (
                <DashboardTabs user={user} onLogout={handleLogout} />
              )}
            />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen
              name="SelectLocationScreen"
              component={SelectLocationScreen}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LandingScreen" component={LandingScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
              name="Login"
              children={() => <Login onUserLogin={handleUserLogin} />}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="RegistrationCode"
              component={RegistrationCode}
            />
            <Stack.Screen
              name="ForgotPasswordEmail"
              component={ForgotPasswordEmail}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
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
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.schemesOnPrimary,
  },
});

export default App;
