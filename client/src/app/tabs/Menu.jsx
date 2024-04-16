import React from "react";
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import Donators from "./Donators";
import Requests from "./Requests";
import FoodDetail from "./FoodDetail";
import { useDimension } from "../../contexts/DimensionContext";

const Stack = createNativeStackNavigator();

export default function MenuStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="MenuStack"
				component={Menu}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Donators"
				component={Donators}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Requests"
				component={Requests}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="FoodDetail"
				component={FoodDetail}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

function DonatorCard() {
	const { dimensions } = useDimension();
	return (
		<View
			style={[
				styles.cardContainer,
				{ width: dimensions.width * 0.9, backgroundColor: "#DEE29A" },
			]}
		>
			<View style={styles.menuType}>
				<Text style={{ fontSize: 18, color: "#63782E" }}>Donators</Text>
				<MaterialIcon size={30} name="read-more" />
			</View>

			<View style={[{ flexDirection: "row", alignItems: "center" }]}>
				<Image
					source={require("../../../assets/donation.png")}
					style={{
						width: 50,
						height: 50,
					}}
					resizeMode="contain"
				/>
				<Text style={styles.cardText}>
					Looking for food donors? Let's cut to the chase. Are you in
					need of generous souls ready to share their surplus food?
				</Text>
			</View>
			<View style={styles.donatorTagContainer}></View>
		</View>
	);
}

function ReuquestCard() {
	const { dimensions } = useDimension();
	return (
		<View
			style={[
				styles.cardContainer,
				{ width: dimensions.width * 0.9, backgroundColor: "#F7CCBF" },
			]}
		>
			<View style={styles.menuType}>
				<Text style={{ fontSize: 18, color: "#6E2D08" }}>
					Food Requests
				</Text>
				<MaterialIcon size={30} name="read-more" />
			</View>

			<View style={[{ flexDirection: "row", alignItems: "center" }]}>
				<Image
					source={require("../../../assets/helping_hand.png")}
					style={{
						width: 50,
						height: 50,
					}}
					resizeMode="contain"
				/>
				<Text style={styles.cardText}>
					Ready to share your surplus food? Let's not beat around the
					bush. Are you searching for folks who could benefit from
					your donations?
				</Text>
			</View>
			<View style={styles.donatorTagContainer}></View>
		</View>
	);
}

export function Menu() {
	const { dimensions } = useDimension();
	const navigation = useNavigation();

	const navigateToDonators = () => {
		navigation.navigate("Donators");
	};

	const navigateToRequests = () => {
		navigation.navigate("Requests");
	};

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={[
					styles.welcomeTextContainer,
					{ height: dimensions.height * 0.25 },
				]}
			>
				<Text style={styles.welcomeSubTitle}>Welcome 💚</Text>
				<Text style={styles.welcomeText}>Share to Care</Text>
			</View>

			<View style={styles.menuContainer}>
				<TouchableOpacity onPress={navigateToDonators}>
					<DonatorCard />
				</TouchableOpacity>

				<TouchableOpacity onPress={navigateToRequests}>
					<ReuquestCard />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F7F6",
		paddingHorizontal: 16,
		paddingVertical: 10,
		alignItems: "center",
	},
	welcomeTextContainer: {
		alignSelf: "flex-start",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		padding: 10,
		marginBottom: 20,
	},
	welcomeText: {
		fontSize: 40,
		fontWeight: "900",
		color: "black",
	},
	welcomeSubTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#089e6c",
	},
	menuContainer: {
		flexGrow: 1,
		padding: 10,
		display: "flex",
		flexDirection: "column",
	},
	menuType: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	cardContainer: {
		padding: 20,
		marginVertical: 15,
		borderRadius: 20,
	},
	cardText: {
		fontSize: 16,
		margin: 10,
		flex: 1,
	},
});
