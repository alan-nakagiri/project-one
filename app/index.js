import { FlatList, SafeAreaView, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import ListCard from '../src/components/ListCard'
import styles from './styles/app'
import { contentfulClient } from '../src/services/contentful'

export const buildArticle = (article) => {
	const { title, eyebrowText, minutes } = article?.fields
	const { id } = article?.sys
	return {
		id,
		title,
		minutes,
		category: eyebrowText.toLowerCase(),
	}
}

export const addArticleToCategory = (results, article, categories) => {
	if (categories.length === 0) { return results }
	const category = categories[0].trim()

	let updatedResults = {
		...results,
		all: results.all.concat([article])
	}

	if (results[category]) {
		updatedResults = {
			...updatedResults,
			[category]: results[category].concat([article])
		}
	} else {
		updatedResults = {
			...updatedResults,
			[category]: [article]
		}
	}

	return addArticleToCategory(updatedResults, article, categories.slice(1))
}

export const parseArticles = (entries) => {
	return entries.reduce((results, entry) => {
		const article = buildArticle(entry)
		const categories = article.category.split('|')
		
		return addArticleToCategory(results, article, categories)
	}, { all: [] })
}


export default function App() {
	const [articles, setArticles] = useState({})
	const [selectedCategory, setSelectedCategory] = useState('all')

	useEffect(() => {
		const loadArticles = async () => {
			// we used Contentful to host our content
			// but we would parse and cache the data on our server
			// So i just spun up a free space in Conetntful to have an api
			// to use to load data
			const entries = await contentfulClient.getEntries({
				content_type: 'article',
				order: 'fields.title'
			})
			const parsedArticles = parseArticles(entries.items)

			setArticles(parsedArticles)
		}
		loadArticles().catch(() => {
			// handle error
		})
	}, [])

	return (
		<SafeAreaView style={styles.appContainer}>
			<View style={styles.menuContainer}>
				<Text style={styles.menuHeader}>{'Categories:'}</Text>
				<ScrollView
					style={{ flexGrow: 0 }}
					contentContainerStyle={styles.menu}
					showsHorizontalScrollIndicator={false}
					horizontal
				>
					{ 
						Object.keys(articles).map((categoryText) => {
							const isSelected = categoryText === selectedCategory
							return (
								<TouchableOpacity
									key={categoryText}
									style={[styles.menuItem, isSelected && styles.selectedMenuItem]}
									onPress={() => setSelectedCategory(categoryText)}
								>
									<Text 
										style={[styles.menuText, isSelected && styles.selectedMenuText]}
									>
										{categoryText}
									</Text>
								</TouchableOpacity>
							)
						}) 
					}
				</ScrollView>
			</View>
			<FlatList
				data={articles[selectedCategory]}
				renderItem={ListCard}
				keyExtractor={(item, index) => `${item.id}_${index}`}
				contentContainerStyle={styles.container}
			/>
		</SafeAreaView>
	)
}
