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

function TopBar() {
	const [latest, setLatest] = useState(true);
	const [nearest, setNearest] = useState(false);

	return (
		<View
			style={{
				flexGrow: 1,
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
			<Image
				source={{ uri: imageUrl }}
				style={styles.image}
				resizeMode="cover"
				onError={(error) => console.log("Error loading image:", error)}
			/>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.content}>{content}</Text>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Interested</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default function Feeds() {
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F7F6",
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
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
		borderRadius: 5,
		alignSelf: "flex-end",
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
