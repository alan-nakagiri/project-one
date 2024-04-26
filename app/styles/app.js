import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	appContainer: {
		backgroundColor: 'white',
		paddingBottom: 20,
		flex: 1,
	},

	container: {
		backgroundColor: 'white',
		paddingHorizontal: 20,
		paddingVertical: 12,
	},

	menuContainer: {
		paddingTop: 8,
	},

	menuHeader: {
		marginLeft: 8,
		fontWeight: 'bold',
	},

	menu: {
		padding: 8,
	},

	menuItem: {
		marginRight: 12,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 20
	},

	selectedMenuItem: {
		borderColor: 'green',
		backgroundColor: 'green',
	},

	menuText: {
		fontSize: 14,
		paddingVertical: 8,
		paddingHorizontal: 12,
	},

	selectedMenuText: {
		color: 'white',
		fontWeight: 'bold'
	},

	articleTitleText: {
		fontSize: 24,
		marginBottom: 20,
	}
})