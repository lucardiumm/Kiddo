import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { Match, Agenda } from '$/types/include'
import axios from 'axios'
import { config } from '$/constants/config'

export function useMatches() {
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState<Match[]>([])

    useEffect(() => {
        (async () => {
            const response = await fetch(config.apis.urls.agenda)
            const result = await response.json()
            const agendas = result.data.filter((el: Agenda) => el.attributes.deportes.toLowerCase() == 'Futbol'.toLowerCase())

            agendas.forEach((value: Agenda) => {
                setData(prevData => [...prevData, {
                    id: value.id,
                    date: value.attributes.date_diary,
                    time: value.attributes.diary_hour,
                    source: value.attributes.embeds.data[0].attributes.embed_name.toLowerCase().replace(' ', ''),
                    title: value.attributes.diary_description,
                }])
            })
        })()
    }, [])

    return { data, refresh }
}