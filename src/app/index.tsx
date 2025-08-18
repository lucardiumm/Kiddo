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
            <StatusBar style={'dark'} />

            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('@/public/images/Logo.png')}
                        alt={'Burger'}
                        resizeMode={'center'}
                        style={styles.logo}
                    />
                    <View style={styles.search}>
                        <Search size={20} color={colors.gray} />

                        <TextInput 
                            autoCapitalize={'none'}
                            autoComplete={'off'}
                            spellCheck={false}
                            autoCorrect={false}
                            value={search}
                            onChangeText={setSearch}
                            placeholder={'Buscar'}
                            style={styles.searchInput}
                        />
                    </View>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
                    {filteredCombos.map(({ link, name }, i) => (
                        <Image
                            key={i}
                            source={{
                                uri: link,
                            }}
                            alt={name}
                            resizeMode={'contain'}
                            resizeMethod={'scale'}
                            style={styles.combo}
                        />
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
        height: '10%',
        justifyContent: 'space-between',
    },
    logo: {
        width: 50,
        aspectRatio: 1,
        marginLeft: '6%',
        marginRight: 'auto',
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        gap: 15,
        marginRight: '5%',
        width: '70%',
        borderRadius: 9999,
        padding: 15,
        height: '65%',
        backgroundColor: colors.search,
    },
    searchInput: {
        width: '80%',
    },
    combo: {
        aspectRatio: 1.5 / 1,
        transform: [
            {
                scale: 0.75,
            }
        ],
        width: (Dimensions.get('window').width),
    }
})