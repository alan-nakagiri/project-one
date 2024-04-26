import React from 'react'
import { render } from '@testing-library/react-native'
import App, { buildArticle } from '../index.js'

describe('the home screen', () => {
	test('renders no articles', () => {
		const { toJSON } = render(<App />)

		expect(toJSON()).toMatchSnapshot()
	})

	// add test to mock state or api
	// test selecting a category
})

describe('buildArticle', () => {
	test('when given articles with fields and sys', () => {
		const article = buildArticle({ fields: { title: 'title', minutes: '10', eyebrowText: 'test' }, sys: { id: 1 } })

		expect(article).toEqual({
			title: 'title',
			minutes: '10',
			id: 1,
			category: 'test'
		})
	})
	// add other edge cases
})

describe('addArticleToCategory', () => {

})

describe('parseArticles', () => {

})