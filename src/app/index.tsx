import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useMatches } from '$/hooks/useMatches'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { config } from '$/constants/config'

export default function Page() {
    const { data: matches, refresh } = useMatches()

    return (
        <>
            <StatusBar style={'dark'} />

            <SafeAreaView style={styles.container}>
                <Text>Welcome!</Text>

                <ScrollView>
                    {matches.map((_, i) => (
                        <TouchableOpacity key={i} onPress={async () => {
                            router.push(`/${_.id}`)
                            // await WebBrowser.openAuthSessionAsync('https://futbollibreonline.org/' + _.source)
                        }}>
                            <Text>{_.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View>
                    <TouchableOpacity onPress={() => router.push('/espn')}>
                        <Text>ESPN</Text>
                    </TouchableOpacity>
                </View>
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
    },
})