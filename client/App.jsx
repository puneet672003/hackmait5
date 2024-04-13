import { SafeAreaView, View, StyleSheet } from "react-native";

import {
	DimensionProvider,
	useDimension,
} from "./src/contexts/DimensionContext";

import Login from "./src/app/Login";
import Home from "./src/app/Home";

export function MainContainer() {
	const { dimensions } = useDimension();
	return (
		<SafeAreaView
			style={{ width: dimensions.width, height: dimensions.height }}
		>
			<View style={styles.root}>
				{/* <Login /> */}
				<Home />
			</View>
		</SafeAreaView>
	);
}

export default function App() {
	return (
		<DimensionProvider>
			<MainContainer />
		</DimensionProvider>
	);
}

styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
