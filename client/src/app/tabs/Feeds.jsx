import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useDimension } from "../../contexts/DimensionContext";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

function TopBar() {
	const [latest, setLatest] = useState(true);
	const [nearest, setNearest] = useState(false);

	return (
		<View
			style={{
				flexGrow: 0,
				display: "flex",
				flexDirection: "column-reverse",
				height: 80,
			}}
		>
			<View style={styles.topBarContainer}>
				<TouchableOpacity
					style={[
						styles.topBarFilter,
						latest && { borderBottomWidth: 2 },
					]}
					onPress={() => {
						setLatest(true);
						setNearest(false);
					}}
				>
					<Text style={styles.filterText}>Latest</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.topBarFilter,
						nearest && { borderBottomWidth: 2 },
					]}
					onPress={() => {
						setLatest(false);
						setNearest(true);
					}}
				>
					<Text style={styles.filterText}>Nearest</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function FeedCard({ title, content, imageUrl }) {
	const { dimensions } = useDimension();

	return (
		<View style={styles.card}>
			{/* <Image
				source={{ uri: imageUrl }}
				style={styles.image}
				resizeMode="cover"
				onError={(error) => console.log("Error loading image:", error)}
			/> */}
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.content}>{content}</Text>
				<TouchableOpacity style={styles.button}>
					<IonIcon name="add" style={styles.buttonText} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

function Details() {
	const [feeds, setFeeds] = useState([{}, {}, {}]);
	return (
		<SafeAreaView style={styles.container}>
			<TopBar />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollViewContent}
			>
				{feeds.map((feed, index) => (
					<FeedCard
						key={index}
						title={"Butter chicken masala"}
						content={
							"Freshly baked butter chicken masala with low masala and oil"
						}
						imageUrl={"https://picsum.photos/200"}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

function DonatorCard() {
	const { dimensions } = useDimension();
	return (
		<View style={[styles.donatorCard, { width: dimensions.width * 0.9 }]}>
			<View style={styles.menuType}>
				<Text style={{ fontSize: 18, color: "#63782E" }}>Donators</Text>
				<MaterialIcon size={30} name="read-more" />
			</View>

			<Text style={styles.donatorName}>
				Looking for food donors? Let's cut to the chase. Are you in need
				of generous souls ready to share their surplus food?
			</Text>
			<View style={styles.donatorTagContainer}></View>
		</View>
	);
}

function ReuquestCard() {
	const { dimensions } = useDimension();
	return (
		<View
			style={[
				styles.donatorCard,
				{ width: dimensions.width * 0.9, backgroundColor: "#F7CCBF" },
			]}
		>
			<View style={styles.menuType}>
				<Text style={{ fontSize: 18, color: "#6E2D08" }}>
					Food Requests
				</Text>
				<MaterialIcon size={30} name="read-more" />
			</View>

			<Text style={styles.donatorName}>
				Ready to share your surplus food? Let's not beat around the
				bush. Are you searching for folks who could benefit from your
				donations?
			</Text>
			<View style={styles.donatorTagContainer}></View>
		</View>
	);
}

export default function Feeds() {
	const { dimensions } = useDimension();
	return (
		<SafeAreaView style={styles.container}>
			<View
				style={[
					styles.welcomeTextContainer,
					{ height: dimensions.height * 0.25 },
				]}
			>
				<Text style={styles.welcomeSubTitle}>welcome 😔</Text>
				<Text style={styles.welcomeText}>Share to Care</Text>
			</View>

			<View style={styles.menuContainer}>
				<View style={styles.menu}>
					<TouchableOpacity>
						<DonatorCard />
					</TouchableOpacity>

					<TouchableOpacity style={styles.menuType}>
						<ReuquestCard />
					</TouchableOpacity>
				</View>

				<View style={styles.menu}></View>
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
		overflow: "hidden",
	},
	welcomeTextContainer: {
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
	menu: {},
	menuType: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	donatorCard: {
		padding: 20,
		marginVertical: 15,
		borderRadius: 20,
		backgroundColor: "#DEE29A",
	},
	donatorImage: {
		height: 150,
		borderRadius: 10,
	},
	donatorName: {
		fontSize: 16,
		margin: 10,
	},
	donatorTagContainer: {},
	vegTag: {},
	nonvegTag: {},
	topBarContainer: {
		display: "flex",
		flexDirection: "row",
		padding: 10,
		justifyContent: "center",
	},
	topBarFilter: {
		paddingHorizontal: 30,
		borderColor: "#09d692",
	},
	filterText: {},
	card: {
		backgroundColor: "#FEFFFE",
		borderRadius: 10,
		overflow: "hidden",
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	image: {
		height: 200,
		borderRadius: 10,
	},
	scrollViewContent: {
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	contentContainer: {
		padding: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
		color: "#333",
	},
	content: {
		fontSize: 16,
		color: "#666",
		marginBottom: 8,
	},
	button: {
		backgroundColor: "#09d692",
		height: 40,
		width: 40,
		borderRadius: 20,
		alignSelf: "flex-end",
		padding: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 25,
		fontWeight: "bold",
	},
});
