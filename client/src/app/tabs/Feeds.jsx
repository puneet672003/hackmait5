import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Feeds() {
	return (
		<View style={styles.feedsContainer}>
			<Text>Feeds tab</Text>
		</View>
	);
}

styles = StyleSheet.create({
	feedsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
