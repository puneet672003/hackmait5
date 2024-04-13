import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Profile() {
	return (
		<View style={styles.feedsContainer}>
			<Text>Profile tab</Text>
		</View>
	);
}

styles = StyleSheet.create({
	profileContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
