import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Notifications() {
	return (
		<View style={styles.notificationsContainer}>
			<Text>Notifications tab</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	notificationsContainer: {
		flexGrow: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
