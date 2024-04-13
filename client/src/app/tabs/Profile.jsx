import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Profile() {
	return (
		<View style={styles.profileContainer}>
			<Text>Profile tab</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	profileContainer: {
		flexGrow: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
