import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useMatches } from '$/hooks/useMatches'
import { Link, router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { config } from '$/constants/config'
import { colors } from '$/constants/colors'
import { combos } from '$/constants/combos'
import { Search } from 'lucide-react-native'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
})

export default function Page() {
    const [refreshing, setRefreshing] = useState(false)
    const [search, setSearch] = useState('')
    
    const filteredCombos = combos.filter(({ name }) => name.toLowerCase().replace(' ', '').includes(search.toLowerCase().replace(' ', '')))

    const refresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }
    
    return (
        <>
            <StatusBar style={'auto'} />

            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Image
                            source={{
                                uri: 'https://ui-avatars.com/api/?name=Luca'
                            }}
                            alt={'Luca'}
                            resizeMode={'center'}
                            style={styles.symbol}
                        />
                    </View>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
                    {filteredCombos.map(({ link, name }, i) => (
                        <View key={i} style={styles.balanceCard}>
                            
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '8%',
        backgroundColor: 'red',
        justifyContent: 'space-between',
    },
    logo: {
        width: 50,
        height: 50,
        marginLeft: '6%',
        marginRight: 'auto',
    },
    symbol: {
        width: 50,
        height: 50,
    },
    balanceCard: {
        aspectRatio: 1.5 / 1,
        transform: [
            {
                scale: 0.75,
            }
        ],
        width: (Dimensions.get('window').width),
    }
})