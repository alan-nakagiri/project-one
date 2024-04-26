import { Stack } from 'expo-router/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// exploring how Expo Router works
export default function Layout() {
  return (
		<SafeAreaProvider>
			<Stack>
				<Stack.Screen name="index" options={{ title: 'Articles' }} />
				<Stack.Screen name="article" options={{ title: '' }} />
			</Stack>
		</SafeAreaProvider>
	)
}
