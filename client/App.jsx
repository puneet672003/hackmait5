import { SafeAreaView, View, StyleSheet, Text } from "react-native";

import { DimensionProvider } from "./src/contexts/DimensionContext";

import Login from "./src/app/Login";
import Home from "./src/app/Home";

export default function App() {
	return (
		<DimensionProvider>
			<View style={[styles.root]}>
				{/* <Login /> */}
				<Home />
			</View>
		</DimensionProvider>
	);
}

styles = StyleSheet.create({
	root: {
		flexGrow: 1,
	},
});
