import { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
// import RNPickerSelect from "react-native-picker-select";

import { useDimension } from "../../contexts/DimensionContext";
import { ScrollView } from "react-native-gesture-handler";
import DropdownComponent from "../components/Dropdown";

function TopBarContainer() {
	const { dimensions } = useDimension();

	return (
		<View style={[styles.topBar]}>
			<Image
				source={require("../../../assets/details.png")}
				resizeMode="contain"
				style={{ height: dimensions.height * 0.1 }}
			/>
		</View>
	);
}

function DetailForm() {
	const { dimensions } = useDimension();

	const [foodType, setFoodType] = useState("");
	const [foodItems, setFoodItems] = useState("");
	const [quantity, setQuantity] = useState("");
	const [pickupDate, setPickupDate] = useState("");
	const [validTill, setValidTill] = useState("");
	const [address, setAddress] = useState("");

	return (
		<ScrollView style={styles.detailContainer}>
			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>Food Type</Text>
				<DropdownComponent
					// label={"Food Type"}
					data={[
						{ label: "Vegeterian", value: "veg" },
						{ label: "Non-Vegeterian", value: "non_veg" },
					]}
				/>
			</View>

			<Input
				value={quantity}
				handleOnChange={setQuantity}
				placeHolder={"Food Quantity"}
				show={true}
				windowWidth={dimensions.width * 0.8}
			/>

			<Input
				value={foodItems}
				handleOnChange={setFoodItems}
				placeHolder={"Food Items"}
				show={true}
				windowWidth={dimensions.width * 0.8}
			/>
		</ScrollView>
	);
}

function Input({ value, handleOnChange, placeHolder, show, windowWidth }) {
	const [focused, setFocused] = useState(false);

	const handleFocus = () => {
		setFocused(true);
	};
	const handleBlur = () => {
		setFocused(false);
	};

	return (
		<View style={styles.inputContainer}>
			<Text style={styles.inputLabel}>{placeHolder}</Text>
			<TextInput
				value={value}
				onChangeText={handleOnChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				secureTextEntry={!show}
				style={[
					styles.textInput,
					focused && styles.textInputFocused,
					{ width: windowWidth },
				]}
				selectionColor={"rgb(4,175,112)"}
			/>
		</View>
	);
}

export default function FoodDetail() {
	const { dimensions } = useDimension();
	return (
		<View style={styles.container}>
			<TopBarContainer />
			<Text style={styles.seperatorText}>Food Details</Text>
			<View
				style={[styles.separator, { width: dimensions.width * 0.6 }]}
			/>
			<View style={styles.formContainer}>
				<DetailForm />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "white",
	},
	formContainer: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	topBar: {
		marginTop: 80,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	separator: {
		height: 1,
		width: "100%",
		backgroundColor: "#ccc",
		alignSelf: "center",
		marginVertical: 4,
	},
	seperatorText: {
		color: "black",
		fontSize: 20,
		marginTop: 20,
		marginBottom: 10,
		paddingHorizontal: 5,
		alignSelf: "center",
	},
	detailContainer: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		padding: 20,
	},
	inputContainer: {
		marginBottom: 15,
	},
	inputLabel: {
		marginBottom: 5,
	},
	textInput: {
		borderColor: "transparent",
		backgroundColor: "rgb(223,250,241)",
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		marginBottom: 5,
	},
	textInputFocused: {
		borderColor: "rgb(4,175,112)",
		backgroundColor: "white",
	},
	button: {
		backgroundColor: "rgb(4,175,112)",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
		margin: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});
