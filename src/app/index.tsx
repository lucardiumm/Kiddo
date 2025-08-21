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

export default function Page() {
    const [refreshing, setRefreshing] = useState(false)
    const [search, setSearch] = useState('')
    const [name, setName] = useState('Luca')
    const [result, setResult] = useState('')

    const messages = [{ role: 'user', content: 'Hello!' }];
    const params = { n_predict: 100, temperature: 0.7 };
    
    const refresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }
    
    return (
        <>
            <StatusBar backgroundColor={colors.orange} translucent={true} style={'auto'} />

            <SafeAreaView style={styles.container}>
                
                
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
                    <TextInput 
                        placeholder={'Dime...'}
                        placeholderTextColor={colors.gray}
                        value={search}
                        onChangeText={setSearch}
                    />

                    <Text>{result}</Text>
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
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: '4%',
        marginLeft: '6%',
        color: colors.black,
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
                scale: 0.90,
            }
        ],
        width: (Dimensions.get('window').width),
        backgroundColor: colors.gray + '20',
        borderRadius: 8,
    }
})