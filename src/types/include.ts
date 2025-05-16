export interface Match {
    id: number;
    time: string;
    date: string;
    source: string;
    title: string;
}

export interface Agenda {
    id: number;
    attributes: {
        deportes: string;
        diary_hour: string;
        diary_description: string;
        date_diary: string;
        embeds: {
            data: { 
                attributes: {
                    embed_name: string;
                }
            }[]
        }
    }
    country: {
        data: {
            attributes: {
                name: string;
            }
        }
    }
}

export interface Joke {
    id: string;
    description: string;
}