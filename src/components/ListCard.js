import React from 'react'
import { Link } from 'expo-router'
import { TouchableOpacity, Text, View } from 'react-native'
import styles from '../styles/listCard'

const ListCard = ({ item }) => {
	const { title, minutes, id, category } = item

	return (
		<Link 
			href={{ pathname: '/article', params: { id } }} 
			asChild
		>
			<TouchableOpacity style={styles.container}>
				<Text style={styles.titleText}>{title}</Text>
				<View style={styles.bottomTextContainer}>
					<Text style={styles.text}>{category}</Text>
					<Text style={styles.text}>{`${minutes} min`}</Text>
				</View>
			</TouchableOpacity>
		</Link>
	)
}

export default ListCard