import { StyleSheet } from "react-native"

export default StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginBottom: 8,
		height: 100,
		justifyContent: 'space-between',
	},
	bottomTextContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	titleText: {
		fontSize: 20,
	},
	text: {
		fontSize: 14,
	}
})