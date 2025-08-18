import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useMatches } from '$/hooks/useMatches'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { config } from '$/constants/config'
import { colors } from '$/constants/colors'

export default function Page() {
    const { data: matches, refresh } = useMatches()

    return (
        <>
            <StatusBar style={'dark'} />

            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text>Pedidos</Text>
                </View>

                <ScrollView>

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
    }
})