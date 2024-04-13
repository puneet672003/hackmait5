import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";

import Feeds from "./tabs/Feeds";
import Donate from "./tabs/Donate";
import Notifications from "./tabs/Notifications";
import Profile from "./tabs/Profile";

import { useDimension } from "../contexts/DimensionContext";

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// Bottom navigator component
export function BottomNavigator({ tabbarStyle }) {
	return (
		<NavigationContainer>
			<Tab.Navigator>
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
		</NavigationContainer>
	);
}

export default function Home() {
	const { dimensions } = useDimension();
	return (
		<View style={[styles.homeContainer, { width: dimensions.width }]}>
			<BottomNavigator tabbarStyle={styles.navigationBar} />
		</View>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
	},
	navigationBar: {
		backgroundColor: "red",
		padding: 10,
		margin: 20,
	},
});
