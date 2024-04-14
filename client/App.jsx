import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DimensionProvider } from "./src/contexts/DimensionContext";

import Login from "./src/app/Login";
import Home from "./src/app/Home";

export default function App() {
	return (
		<DimensionProvider>
			<GestureHandlerRootView style={[styles.root]}>
				{/* <Login /> */}
				<Home />
			</GestureHandlerRootView>
		</DimensionProvider>
	);
}

styles = StyleSheet.create({
	root: {
		flexGrow: 1,
	},
});
