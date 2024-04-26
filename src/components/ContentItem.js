import React from 'react'
import { View } from 'react-native'
import uuid from 'react-native-uuid'
import ContentfulRichTextParser from './ContentfulRichTextParser'

// old component copied over and updated to copy over less
const ContentItem = (props) => {
	const { item } = props

	switch (item.componentType) {
		case 'RichText':
			return (
				<View key={uuid.v1()}>
					<ContentfulRichTextParser content={item.description.content} />
				</View>
			)
		case 'InfoModal':
		case 'Carousel':
		case 'Image':
		case 'Banner':
		default:
			return null
	}
}

export default ContentItem
