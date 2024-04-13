import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Notifications() {
	return (
		<View style={styles.feedsContainer}>
			<Text>Notifications tab</Text>
		</View>
	);
}

styles = StyleSheet.create({
	notificationsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
