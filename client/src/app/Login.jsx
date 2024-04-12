import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import { getToken } from "../utils/token";

const { height, width } = Dimensions.get("window");

function Input({ value, hadleOnChange, placeHolder, show }) {
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
				onChangeText={hadleOnChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				secureTextEntry={!show}
				style={[styles.textInput, focused && styles.textInputFocused]}
				selectionColor={"rgb(4,175,112)"}
			/>
		</View>
	);
}

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onPressLogin = async () => {
		console.log("submitting: \t");
		console.log("username: ", username);
		console.log("\tpassword: ", password);
		// try {
		// 	const tokens = await getToken(username, password);
		// 	console.log("access token: ", tokens.access_token);
		// 	console.log("refresh token: ", tokens.refresh_token);
		// } catch (err) {
		// 	console.error(err);
		// }

		setUsername("");
		setPassword("");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Let's make your{"\n"}{" "}
				<Text style={styles.highlightedText}>account!</Text>
			</Text>
			<Input
				value={username}
				placeHolder={"Username"}
				hadleOnChange={setUsername}
				show={true}
			/>
			<Input
				value={password}
				placeHolder={"Password"}
				hadleOnChange={setPassword}
				show={false}
			/>
			<TouchableOpacity onPress={onPressLogin} style={styles.button}>
				<Text style={styles.buttonText}>Next</Text>
			</TouchableOpacity>
			<View style={styles.signupTextContainer}>
				<Text style={styles.signupText}>Already have an account?</Text>
				<TouchableOpacity>
					<Text style={styles.highlightedText}>Sign in</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
		maxHeight: height * 0.6,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		width: width * 0.8,
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "left",
		marginBottom: 50,
	},
	highlightedText: {
		color: "rgb(4,175,112)",
	},
	inputContainer: {
		marginBottom: 15,
	},
	inputLabel: {
		marginBottom: 5,
	},
	textInput: {
		width: width * 0.8,
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
		width: width * 0.8,
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
	signupTextContainer: {
		marginTop: 20,
		alignItems: "center",
	},
	signupText: {
		fontSize: 14,
	},
});
