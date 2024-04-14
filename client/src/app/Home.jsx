import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import Menu from "./tabs/Menu";
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
					const iconSize = 24;

					if (route.name === "Menu") iconName = "home-outline";
					else if (route.name === "Donate")
						iconName = "heart-outline";
					else if (route.name === "Notifications")
						iconName = "notifications-outline";
					else if (route.name === "Profile")
						iconName = "person-outline";

					return (
						<IonIcon
							name={iconName}
							size={iconSize}
							color={iconColor}
							style={[
								{
									paddingVertical: 10,
								},
								focused && {
									borderTopWidth: 4,
									borderTopColor: "rgb(4,175,112)",
								},
							]}
						/>
					);
				},
				tabBarStyle: tabBarStyle,
				tabBarLabelStyle: { display: "none" },
			})}
		>
			<Tab.Screen
				name="Menu"
				component={Menu}
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
