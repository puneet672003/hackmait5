import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Image } from "react-native";

function FeedCard({ title, content, imageUrl }) {
	return (
		<View style={styles.card}>
			<Image
				source={{ uri: imageUrl }}
				style={styles.image}
				resizeMode="cover"
			/>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.content}>{content}</Text>
		</View>
	);
}

export default function Feeds() {
	const [feeds, setFeeds] = useState([{}, {}, {}]);
	return (
		<SafeAreaView style={styles.feedsContainer}>
			<FeedCard
				title={"Butter chicken masal"}
				content={
					"Freshly baked butter chicken masala with low masala and oil"
				}
				imageUrl={
					"https://static.toiimg.com/thumb/53205522.cms?imgsize=302803&width=800&height=800"
				}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	feedsContainer: {
		flexGrow: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 15,
		marginBottom: 10,
		shadowColor: "rgba(0, 0, 0, 0.1)",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 3,
	},
	image: {
		width: "100%",
		height: 200, // Adjust height as needed
		marginBottom: 10,
		borderRadius: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
		color: "rgb(4,175,112)",
	},
	content: {
		fontSize: 16,
		color: "black",
	},
});
