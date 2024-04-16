import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useDimension } from "../../contexts/DimensionContext";

function TopBarContainer() {
	const { dimensions } = useDimension();

	return (
		<View style={[styles.topBar, { height: dimensions.height * 0.35 }]}>
			<Image
				source={require("../../../assets/food.png")}
				resizeMode="contain"
				style={{ height: dimensions.height * 0.1 }}
			/>
			<Text style={styles.topBarText}>
				Let's make sure no food goes to waste.
			</Text>

			<CreateDonationPost />
		</View>
	);
}

function CreateDonationPost() {
	const { dimensions } = useDimension();

	const navigation = useNavigation();
	const navigateToFoodDetail = () => {
		navigation.navigate("FoodDetail");
	};

	return (
		<TouchableOpacity
			onPress={navigateToFoodDetail}
			style={[
				styles.donationPostButton,
				{ width: dimensions.width * 0.7 },
			]}
		>
			<Text style={styles.donationButtonText}>
				+ Create Donation Post
			</Text>
		</TouchableOpacity>
	);
}

function DonationPosts({ postList }) {
	const { dimensions } = useDimension();

	return (
		<ScrollView contentContainerStyle={styles.postsContainer}>
			{postList.map((postData, index) => {
				const colorNumber = index % 4;
				let colour;
				let titleColour;

				switch (colorNumber) {
					case 0:
						colour = "#DEE29A";
						titleColour = "#3B550C";
						break;
					case 1:
						colour = "#F7CCBF";
						titleColour = "#743712";
						break;
					case 2:
						colour = "#F4DEA4";
						titleColour = "#A96E28";
						break;
					case 3:
						colour = "#C7DFE5";
						titleColour = "#205199";
						break;
				}

				return (
					<TouchableOpacity
						key={index}
						style={[
							styles.postStyle,
							{
								width: dimensions.width * 0.9,
								backgroundColor: colour,
							},
						]}
					>
						<Text
							style={[styles.postTitle, { color: titleColour }]}
						>
							{postData.username}
						</Text>
						<View style={[styles.postDetail]}>
							<View
								style={{
									flexGrow: 1,
									marginRight: 15,
								}}
							>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
									}}
								>
									<Text
										style={{
											marginRight: 20,
											color: titleColour,
										}}
									>
										Valid till:
									</Text>
									<Text>12 MAY 2024</Text>
								</View>

								<View
									style={{
										display: "flex",
										flexDirection: "row",
									}}
								>
									<Text
										style={{
											marginRight: 20,
											color: titleColour,
										}}
									>
										Quantity:
									</Text>
									<Text>4{"  "}people</Text>
								</View>
							</View>
							<Image
								source={{
									uri: `https://api.multiavatar.com/${postData.username}.png`,
								}}
								style={{
									width: 130,
									height: 130,
								}}
							/>
						</View>
					</TouchableOpacity>
				);
			})}
			<View style={{ height: dimensions.height * 0.5 }} />
		</ScrollView>
	);
}

export default function Donators() {
	const { dimensions } = useDimension();
	const [postList, setPostList] = useState([
		{
			username: "nancy",
			expDate: new Date(),
			address: "B4 block, Ashok vihar, New Delhi",
			quantity: 5,
			tags: ["veg"],
		},
		{
			username: "puneet",
			expDate: new Date(),
			address: "B4 block, Ashok vihar, New Delhi",
			quantity: 5,
			tags: ["veg"],
		},
		{
			username: "naman",
			expDate: new Date(),
			address: "B4 block, Ashok vihar, New Delhi",
			quantity: 5,
			tags: ["veg"],
		},
		{
			username: "kuro",
			expDate: new Date(),
			address: "B4 block, Ashok vihar, New Delhi",
			quantity: 5,
			tags: ["veg"],
		},
		{
			username: "light yagami",
			expDate: new Date(),
			address: "B4 block, Ashok vihar, New Delhi",
			quantity: 5,
			tags: ["veg"],
		},
		{
			username: "Shinigami",
			expDate: new Date(),
			address: "B4 block, Ashok vihar, New Delhi",
			quantity: 5,
			tags: ["veg"],
		},
		{
			username: "hshhh",
			expDate: new Date(),
			address: "B4 block, Ashok vihar, New Delhi",
			quantity: 5,
			tags: ["veg"],
		},
		{
			username: "puneet",
			expDate: new Date(),
			address: "B4 block, Ashok vihar, New Delhi",
			quantity: 5,
			tags: ["veg"],
		},
	]);

	return (
		<View style={styles.container}>
			<TopBarContainer />
			<Text style={styles.seperatorText}>Available Donations</Text>
			<View
				style={[styles.separator, { width: dimensions.width * 0.6 }]}
			/>
			<DonationPosts postList={postList} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	topBar: {
		marginTop: 10,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	topBarText: {
		fontSize: 16,
		padding: 10,
	},
	donationPostButton: {
		height: 50,
		backgroundColor: "rgb(4,175,112)",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 15,
	},
	donationButtonText: {
		color: "white",
		fontSize: 16,
	},
	postsContainer: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	postStyle: {
		borderRadius: 20,
		marginVertical: 5,
		paddingVertical: 5,
		paddingHorizontal: 20,
	},
	postTitle: { fontSize: 20, fontWeight: 900 },
	postDetail: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 10,
	},
	separator: {
		height: 1,
		width: "100%",
		backgroundColor: "#ccc",
		alignSelf: "center",
		marginVertical: 4,
	},
	seperatorText: {
		color: "#555",
		marginTop: 10,
		paddingHorizontal: 5,
		alignSelf: "center",
	},
});
