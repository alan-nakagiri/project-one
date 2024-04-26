import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { contentfulClient } from '../src/services/contentful'
import ContentItem from '../src/components/ContentItem'
import styles from './styles/app'

const Article = () => {
const params = useLocalSearchParams()
const [article, setArticle] = useState({})

	useEffect(() => {
		const loadArticle = async () => {
			const entry = await contentfulClient.getEntry(params.id)
			setArticle(entry)
		}
		loadArticle().catch(() => {
			// handle error
		})
	}, [])

	if (!article.fields) { return null }

	// ContentItems was a something we had to build articles from
	// that allowed design to create articles that were more than just text
	// I'm only rendering the rich text
	const { title, contentItems } = article.fields

	return (
		<SafeAreaView style={styles.appContainer}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.articleTitleText}>{title}</Text>
				{
					contentItems.map((item, index) => {
						return <ContentItem key={`${title}${index}`} item={item.fields} />
					})
				}
			</ScrollView>
		</SafeAreaView>
	)
}

export default Article