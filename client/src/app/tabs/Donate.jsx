import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Donate() {
	return (
		<View style={styles.feedsContainer}>
			<Text>Donate tab</Text>
		</View>
	);
}

styles = StyleSheet.create({
	donateContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
