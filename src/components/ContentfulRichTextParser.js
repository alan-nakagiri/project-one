import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from '../styles/contentfulRichTextParser'
import uuid from 'react-native-uuid'
import { gray2, spacing16To20, spacing20To24 } from '../styles/variables'
import { bodyText } from '../styles/fonts'

// old component copied over
class ContentfulRichTextParser extends Component {
	constructor(props) {
		super(props)

		this.fontOptions = this.normalizeFonts()
	}

	normalizeFonts = () => {
		switch (this.props.baselineFont) {
			case ('medium'):
				return {
					text: styles.mediumText,
					boldText: styles.boldText,
					italicText: styles.mediumItalicText,
					underlineText: styles.underlineText,
				}
			default:
				return {
					text: styles.text,
					boldText: styles.mediumText,
					italicText: styles.italicText,
					underlineText: styles.underlineText,
				}
		}
	}

	onPress = (url) => {
		this.props.linkPress()
		navigation.webView(this.props.navigationComponentId, url)
	}

	renderParagraph = (content, index) => {
		const { color, fontSize, lineHeight, textAlign, justifyContent, paragraphSpacing } = this.props

		const parsedItems = content.map((item) => {
			if (item.nodeType === 'text') {
				const textStyle = item.marks.length === 0 ? this.fontOptions.text : this.parseTextMarks(item.marks)

				return (
					<Text
						key={`${item.value}_${uuid.v1()}`}
						style={[textStyle, { color, fontSize, lineHeight }]}
					>
						{item.value}
					</Text>
				)
			} else if (item.nodeType === 'hyperlink') {
				const hyperlink = item.content[0]
				const textStyle = hyperlink.marks.length === 0 ? this.fontOptions.boldText : this.parseTextMarks(hyperlink.marks)

				const { value } = hyperlink
				const { uri } = item.data

				return (
					<Text
						onPress={() => this.onPress(uri)}
						key={`${value}_${uuid.v1()}`}
						style={[textStyle, styles.textLinkStyles, { color, fontSize, lineHeight }]}
					>
						{value}
					</Text>
				)
			} else {
				return <Text>{'Unrecognized nodeType'}</Text>
			}
		})

		const paragraphStyles = {
			marginTop: index === 0 ? 0 : paragraphSpacing,
			justifyContent: textAlign === 'center' || justifyContent === 'center' ? 'center' : 'flex-start',
		}

		return (
			<View
				key={`paragraph_${uuid.v1()}`}
				style={paragraphStyles}
			>
				<Text style={{ textAlign: textAlign || 'left' }}>
					{parsedItems}
				</Text>
			</View>
		)
	}

	parseTextMarks = (marks) => {
		return marks.map((mark) => {
			switch (mark.type) {
				case ('underline'):
					return this.fontOptions.underlineText
				case ('bold'):
					return this.fontOptions.boldText
				case ('italic'):
					return this.fontOptions.italicText
				default:
					return {}
			}
		})
	}

	renderOrderedList = (contents, index) => {
		const color = this.props.color || gray2

		const list = contents.map((listItem) => {
			return this.parseContent(listItem.content, { marginBottom: 0 })
		})

		const formattedList = list.map((textItem, listItemIndex) => {
			const paddingTop = { paddingTop: spacing20To24 }
			return (
				<View
					key={`ordered_list_item_${uuid.v1()}`}
					style={[styles.listItem, paddingTop]}
				>
					<View style={styles.orderedListNumber}>
						<Text style={[styles.orderedListNumberText, { fontSize: this.props.fontSize, color }]}>
							{`${listItemIndex + 1}.`}
						</Text>
					</View>
					<View style={styles.itemTextContainer}>
						{textItem}
					</View>
				</View>
			)
		})
		return (
			<View
				key={`ordered-list_${uuid.v1()}`}
				style={[styles.orderedList]}
			>
				{formattedList}
			</View>
		)
	}

	renderUnorderedList = (contents, index) => {
		const backgroundColor = this.props.color || gray2

		const list = contents.map((listItem) => {
			return this.parseContent(listItem.content, { marginBottom: 0 })
		})

		const listStyle = { paddingTop: index === 0 ? 0 : 16 }

		const formattedList = list.map((textItem, listItemIndex) => {
			const itemPadding = { paddingTop: listItemIndex === 0 ? 0 : 16 }
			return (
				<View
					key={`unordered_list_item_${uuid.v1()}`}
					style={[styles.listItem, itemPadding]}
				>
					<View style={[styles.unorderedBullet, { backgroundColor }]} />
					<View style={styles.itemTextContainer}>
						{textItem}
					</View>
				</View>
			)
		})
		return (
			<View
				key={`unordered-list_${uuid.v1()}`}
				style={[styles.unorderedList, listStyle]}
			>
				{formattedList}
			</View>
		)
	}

	headingStyles = (nodeType) => {
		// nodeType is of the form heading-3, heading-4, etc..
		const heading = nodeType.replace('-', '')
		return [styles[heading], { color: this.props.color }]
	}

	renderHeading = (contents) => {
		const parsedItems = contents.content.map((item) => {
			return (
				<Text
					key={`heading_${item.value}_${uuid.v1()}`}
					style={this.headingStyles(contents.nodeType)}
				>
					{item.value}
				</Text>
			)
		})
		return (
			<View 
				key={`heading_${uuid.v1()}`} 
				style={styles.headingContainer}
			>
				<Text>{parsedItems}</Text>
			</View>
		)
	}

	// This is a bug fix when contentful sends down an extra paragraph after an unordered list
	filterForListSpacing = (content) => {
		if (content.length < 2) { return content }
		const lastItem = content[content.length - 1]
		const secondToLastItem = content[content.length - 2]
		if (!['ordered-list', 'unordered-list'].includes(secondToLastItem.nodeType)) { return content }
		if (lastItem.nodeType === 'paragraph' && lastItem.content.length === 1 && lastItem.content[0].value === '') {
			return content.slice(0, content.length - 1)
		}
		return content
	}

	parseContent = (content) => {
		return content.map((item, index) => {
			const renderItems = []
			if (item.nodeType === 'paragraph') {
				const paragraph = this.renderParagraph(item.content, index)
				return renderItems.concat(paragraph)
			} else if (item.nodeType === 'ordered-list') {
				const orderedList = this.renderOrderedList(item.content, index)
				return renderItems.concat(orderedList)
			} else if (item.nodeType === 'unordered-list') {
				const unorderedList = this.renderUnorderedList(item.content, index)
				return renderItems.concat(unorderedList)
			} else if (item.nodeType.includes('heading')) {
				const heading = this.renderHeading(item)
				return renderItems.concat(heading)
			} else {
				return renderItems
			}
		})
	}

	renderPlainText = () => {
		const { color, fontSize, lineHeight, textAlign } = this.props
		return (
			<View key={uuid.v1()}>
				<Text style={[this.fontOptions.text, { color, fontSize, lineHeight, textAlign }]}>
					{this.props.content}
				</Text>
			</View>
		)
	}

	render() {
		if (typeof this.props.content === 'string') {
			return this.renderPlainText()
		}

		const filteredContent = this.filterForListSpacing(this.props.content)
		const parsedContent = this.parseContent(filteredContent)

		return (
			<View key={uuid.v1()}>
				{parsedContent}
			</View>
		)
	}
}

ContentfulRichTextParser.defaultProps = {
	content: [],
	paragraphSpacing: spacing16To20,
	fontSize: bodyText.fontSize,
	baselineFont: 'regular',
	lineHeight: bodyText.lineHeight,
	justifyContent: 'flex-start',
	color: gray2,
}

ContentfulRichTextParser.propTypes = {
	content: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.string,
	]),
	paragraphSpacing: PropTypes.number,
	linkPress: PropTypes.func,
	navigationComponentId: PropTypes.string,
	color: PropTypes.string,
	justifyContent: PropTypes.string,
	textAlign: PropTypes.string,
	fontSize: PropTypes.number,
	lineHeight: PropTypes.number,
	baselineFont: PropTypes.string,
}

export default ContentfulRichTextParser
