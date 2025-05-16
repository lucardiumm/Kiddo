import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text } from 'react-native'
import { useMatches } from '$/hooks/useMatches'
import { WebView } from 'react-native-webview'
import { useLocalSearchParams } from 'expo-router'
import { config } from '$/constants/config'

export default function Page() {
    const { matchId } = useLocalSearchParams()
    const { data: matches } = useMatches()

    const match = matches.find(el => el.id == parseInt(matchId as string))

    if (!match) {
        return
    }

    console.log(config.apis.urls.la12.concat(match.source))

    return (
        <>
            <StatusBar style={'dark'} />

            <SafeAreaView style={styles.container}>
                <Text>{match.title}</Text>

                <WebView 
                    style={styles.web}
                    source={{
                        html: `
                        <!DOCTYPE html>
                        <html>
                            <head></head>
                            <body>
                                <div id="baseDiv">
                                    <iframe src="${config.apis.urls.la12.concat(match.source)}"
                                        title="iframe Example 1" width="400" height="300">
                                    </iframe>
                                </div>
                            </body>
                        </html>
                        `
                    }}
                />
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
    },
    web: {
        width: 500,
        height: 400,
    },
})