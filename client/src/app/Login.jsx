import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
} from "react-native";

import { useDimension } from "../contexts/DimensionContext";
import { getToken } from "../utils/token";

function Input({ value, hadleOnChange, placeHolder, show, windowWidth }) {
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

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { dimensions } = useDimension();

	const onPressLogin = async () => {
		console.log("submitting: ");
		console.log("\tusername: ", username);
		console.log("\tpassword: ", password);

		const tokens = await getToken(username, password);
		console.log(tokens);

		setUsername("");
		setPassword("");
	};

	return (
		<SafeAreaView
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<View
				style={[
					styles.loginContainer,
					{ maxHeight: dimensions.height * 0.6 },
				]}
			>
				<Text style={[styles.title, { width: dimensions.width * 0.8 }]}>
					Let's make your{"\n"}{" "}
					<Text style={styles.highlightedText}>account!</Text>
				</Text>
				<Input
					value={username}
					placeHolder={"Username"}
					hadleOnChange={setUsername}
					show={true}
					windowWidth={dimensions.width * 0.8}
				/>
				<Input
					value={password}
					placeHolder={"Password"}
					hadleOnChange={setPassword}
					show={false}
					windowWidth={dimensions.width * 0.8}
				/>
				<TouchableOpacity
					onPress={onPressLogin}
					style={[styles.button, { width: dimensions.width * 0.8 }]}
				>
					<Text style={styles.buttonText}>Next</Text>
				</TouchableOpacity>
				<View style={styles.signupTextContainer}>
					<Text style={styles.signupText}>
						Already have an account?
					</Text>
					<TouchableOpacity>
						<Text style={styles.highlightedText}>Sign in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
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
	signupTextContainer: {
		marginTop: 20,
		alignItems: "center",
	},
	signupText: {
		fontSize: 14,
	},
});
