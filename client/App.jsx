import { SafeAreaView, View, StyleSheet } from "react-native";

import Login from "./src/app/Login";

export default function App() {
	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.container}>
				<Login />
			</View>
		</SafeAreaView>
	);
}

styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
