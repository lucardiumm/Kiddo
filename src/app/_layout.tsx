import { Stack, Tabs, router } from 'expo-router'
import { useFonts } from 'expo-font'
import { CircleUserRound, CreditCard, House } from 'lucide-react-native'
import { colors } from '$/constants/colors'

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
                display: 'flex',
                height: '11%',
            },
            tabBarItemStyle: {
                marginTop: '2%',
            },
            tabBarActiveTintColor: colors.orange,
            tabBarInactiveTintColor: colors.gray,
        }}>
            <Tabs.Screen name={'index'} options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size, focused }) => (
                    <House color={color} size={size} strokeWidth={1.5} />
                )
            }} />
            <Tabs.Screen name={'orders'} options={{
                headerShown: false,
                tabBarLabel: 'Tarjetas',
                tabBarIcon: ({ color, size, focused }) => (
                    <CreditCard color={color} size={size} strokeWidth={1.5} />
                )
            }} />
            <Tabs.Screen name={'account'} options={{
                headerShown: false,
                tabBarLabel: 'Cuenta',
                tabBarIcon: ({ color, size, focused }) => (
                    <CircleUserRound color={color} size={size} strokeWidth={1.5} />
                )
            }} />
            <Tabs.Screen name={'[transactionId]'} options={{
                headerShown: false,
                tabBarItemStyle: {
                    display: 'none',
                }
            }} />
        </Tabs>
    )
}