import { StyleSheet } from 'react-native'
import { mediumBodyText, bodyText, bigTitleText, titleText, smallTitleText, smallestTitleText } from './fonts'
import { spacing32To40 } from './variables'
import {
	aeonikMedium,
	aeonikRegularItalic,
	aeonikMediumItalic,
	aeonikRegular,
} from './fonts'

// old stylesheet
export default StyleSheet.create({
	text: {
		...bodyText,
	},

	mediumText: {
		...mediumBodyText,
	},

	boldText: {
		fontFamily: aeonikMedium,
	},

	underlineText: {
		...bodyText,
		textDecorationLine: 'underline',
	},

	italicText: {
		fontFamily: aeonikRegularItalic,
	},

	mediumItalicText: {
		fontFamily: aeonikMediumItalic,
	},

	textLinkStyles: {
		textDecorationLine: 'underline',
	},

	headingContainer: {
		marginTop: spacing32To40,
	},

	heading3: {
		...bigTitleText,
	},

	heading4: {
		...titleText,
	},

	heading5: {
		...smallTitleText,
	},

	heading6: {
		...smallestTitleText,
	},

	listItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},

	itemTextContainer: {
		flex: 1,
	},

	orderedListNumber: {
		marginTop: -1,
	},

	orderedListNumberText: {
		fontFamily: aeonikRegular,
		lineHeight: 22,
		width: 24,
	},

	unorderedBullet: {
		borderRadius: 2.5,
		height: 4,
		marginTop: 8,
		width: 4,
		marginRight: 20,
	},
})
