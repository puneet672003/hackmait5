import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Donate() {
	return (
		<View style={styles.donateContainer}>
			<Text>Donate tab</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	donateContainer: {
		flexGrow: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
