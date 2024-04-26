import { Dimensions } from 'react-native'

// old stylesheet added to prevent things from breaking

export const gray2 = '#252433'

// Margin and Padding
const { width, height } = Dimensions.get('window')

export const spacing2To4 = false ? 2 : 4
export const spacing4To8 = false ? 4 : 8
export const spacing8To12 = false ? 8 : 12
export const spacing8To16 = false ? 8 : 16
export const spacing8To24 = false ? 8 : 24
export const spacing12To16 = false ? 12 : 16
export const spacing16To24 = false ? 16 : 24
export const spacing16To20 = false ? 16 : 20
export const spacing20To24 = false ? 20 : 24
export const spacing24To28 = false ? 24 : 28
export const spacing24To32 = false ? 24 : 32
export const spacing28To32 = false ? 28 : 32
export const spacing28To36 = false ? 28 : 36
export const spacing32To36 = false ? 32 : 36
export const spacing24To40 = false ? 24 : 40
export const spacing32To40 = false ? 32 : 40
export const spacing44To48 = false ? 44 : 48
export const spacing40To60 = false ? 40 : 60

export const gutterPadding = spacing16To24
