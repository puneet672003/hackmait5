import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { useDimension } from "../../contexts/DimensionContext";

const DropdownComponent = ({ data }) => {
	const { dimensions } = useDimension();
	const [value, setValue] = useState(null);
	const [isFocus, setIsFocus] = useState(false);

	return (
		<View style={[styles.container, { width: dimensions.width * 0.8 }]}>
			<Dropdown
				style={[styles.dropdown, isFocus && styles.dropdownFocus]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? "Select item" : "..."}
				searchPlaceholder="Search..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setValue(item.value);
					setIsFocus(false);
				}}
				renderLeftIcon={() => (
					<MaterialIcon
						style={styles.icon}
						color={isFocus ? "rgb(4,175,112)" : "black"}
						name="fastfood"
						size={20}
					/>
				)}
			/>
		</View>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	container: {},
	dropdown: {
		height: 50,
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		backgroundColor: "rgb(223,250,241)",
	},
	dropdownFocus: {
		borderColor: "rgb(4,175,112)",
		backgroundColor: "white",
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 16,
		paddingHorizontal: 10,
	},
	selectedTextStyle: {
		fontSize: 16,
		paddingHorizontal: 10,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
