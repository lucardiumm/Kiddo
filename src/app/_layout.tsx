import { Stack, Tabs, router } from 'expo-router'
import { useFonts } from 'expo-font'

export default function Layout() {
    const [loaded, error] = useFonts({
        // 'mon': require('../public/fonts/Montserrat/Montserrat-Regular.ttf'),
    })
    
    if (!loaded && !error) {
        return null
    }

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                display: 'none',
            }
        }}>
            <Tabs.Screen name={'index'} options={{
                headerShown: false,
            }} />
            <Tabs.Screen name={'[burgaId]'} options={{
                headerShown: false,
            }} />
        </Tabs>
    )
}