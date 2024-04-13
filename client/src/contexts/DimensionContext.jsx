import { createContext, useContext, useState, useEffect } from "react";
import { Dimensions } from "react-native";

const DimensionContext = createContext();

export function DimensionProvider({ children }) {
	const [dimensions, setDimensions] = useState(Dimensions.get("window"));

	useEffect(() => {
		const updateDimensions = () => {
			setDimensions(Dimensions.get("window"));
		};

		Dimensions.addEventListener("change", updateDimensions);
	}, []);

	return (
		<DimensionContext.Provider value={{ dimensions, setDimensions }}>
			{children}
		</DimensionContext.Provider>
	);
}

export const useDimension = () => {
	const context = useContext(DimensionContext);

	if (!context) {
		throw new Error("useDimension must be used within DimensionProvider");
	}

	return context;
};
