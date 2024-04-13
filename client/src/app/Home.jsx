import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Feeds from "./tabs/Feeds";
import Donate from "./tabs/Donate";
import Notifications from "./tabs/Notifications";
import Profile from "./tabs/Profile";

import { useDimension } from "../contexts/DimensionContext";

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// Bottom navigator component
function BottomNavigator({ sceneStyle, tabBarStyle }) {
	const { dimensions } = useDimension();

	return (
		<Tab.Navigator
			sceneContainerStyle={[sceneStyle, { width: dimensions.width }]}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size, focused }) => {
					let iconName;
					const iconColor = focused ? "rgb(4,175,112)" : "black";

					if (focused) size = size * 1.5;

					if (route.name === "Feeds") iconName = "home";
					else if (route.name === "Donate") iconName = "gratipay";
					else if (route.name === "Notifications") iconName = "bell";
					else if (route.name === "Profile") iconName = "user";

					return (
						<Icon name={iconName} size={size} color={iconColor} />
					);
				},
				tabBarStyle: tabBarStyle,
				tabBarLabelStyle: { display: "none" },
			})}
		>
			<Tab.Screen
				name="Feeds"
				component={Feeds}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Donate"
				component={Donate}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Notifications"
				component={Notifications}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
}

export default function Home() {
	return (
		<NavigationContainer>
			<BottomNavigator
				sceneStyle={styles.sceneContainer}
				tabBarStyle={styles.navigationBar}
			/>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	sceneContainer: {
		flexGrow: 1,
		display: "flex",
		backgroundColor: "#eee",
	},
	navigationBar: {
		elevation: 0,
		borderTopWidth: 0,
		backgroundColor: "white",
	},
});
