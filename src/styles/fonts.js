import { gray2 } from './variables'

// old stylesheet added to prevent things from breaking
const iosFonts = {
	aeonikBold: 'Aeonik-Bold',
	aeonikLight: 'Aeonik-Light',
	aeonikMedium: 'Aeonik-Medium',
	aeonikMediumItalic: 'Aeonik-MediumItalic',
	aeonikRegular: 'Aeonik-Regular',
	aeonikRegularItalic: 'Aeonik-RegularItalic',
	notoMonoRegular: 'NotoMono',
}

const androidFonts = {
	aeonikBold: 'aeonik-bold',
	aeonikLight: 'aeonik-light',
	aeonikMedium: 'aeonik-medium',
	aeonikMediumItalic: 'aeonik-mediumItalic',
	aeonikRegular: 'aeonik-regular',
	aeonikRegularItalic: 'aeonik-regularItalic',
	notoMonoRegular: 'notomono-regular',
}

function getFonts(fontName) { iosFonts[fontName] }

export const aeonikBold = getFonts('aeonikBold')
export const aeonikLight = getFonts('aeonikLight')
export const aeonikMedium = getFonts('aeonikMedium')
export const aeonikMediumItalic = getFonts('aeonikMediumItalic')
export const aeonikRegular = getFonts('aeonikRegular')
export const aeonikRegularItalic = getFonts('aeonikRegularItalic')
export const notoMonoRegular = getFonts('notoMonoRegular')

const lightText = (fontSize, lineHeight) => ({
	fontSize,
	lineHeight,
	color: gray2,
	fontFamily: aeonikLight,
})

const regularText = (fontSize, lineHeight) => ({
	fontSize,
	lineHeight,
	color: gray2,
	fontFamily: aeonikRegular,
})

const mediumText = (fontSize, lineHeight) => ({
	fontSize,
	lineHeight,
	color: gray2,
	fontFamily: aeonikMedium,
})

const boldText = (fontSize, lineHeight) => ({
	fontSize,
	lineHeight,
	color: gray2,
	fontFamily: aeonikBold,
})

export const regularText12 = regularText(12, 14)
export const mediumText12 = mediumText(12, 14)
export const boldText12 = boldText(12, 14)

export const regularText16 = regularText(16, 22)
export const mediumText16 = mediumText(16, 22)

export const regularText18 = regularText(18, 24)
export const mediumText18 = mediumText(18, 24)

export const regularText20 = regularText(20, 24)
export const mediumText20 = mediumText(20, 24)

export const mediumText24 = mediumText(24, 28)

export const regularText28 = regularText(28, 32)
export const mediumText28 = mediumText(28, 32)

export const mediumText32 = mediumText(32, 36)
export const regularText52 = regularText(52, 52)
export const mediumText52 = mediumText(52, 52)
export const regularText56 = regularText(56, 70)
export const mediumText56 = mediumText(56, 70)
export const lightText56 = lightText(56, 70)
export const regularText64 = regularText(64, 80)
export const mediumText64 = mediumText(64, 80)
export const mediumText68 = mediumText(68, 72)
export const regularText80 = regularText(80, 88)
export const mediumText80 = mediumText(80, 88)

export const mediumBodyText = true ? mediumText18 : mediumText16
export const bodyText = true ? regularText18 : regularText16
export const smallestTitleText = true ? mediumText20 : mediumText18
export const smallTitleText = true ? mediumText24 : mediumText20
export const titleText = true ? mediumText28 : mediumText24
export const bigTitleText = true ? mediumText32 : mediumText28
export const regularText56to52 = true ? regularText56 : regularText52
export const mediumText68to56 = true ? mediumText68 : mediumText56