import React from "react";
import { Riga } from "./Riga";
import { UseFetch } from "./UseFetch";

const endpoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCKy1dAqELo0zrOtPkf0eTMw&maxResults=25&q=first%20minutes&type=videos&key=${process.env.REACT_APP_key}`

export function YoutubeNews() {
    const { data, error } = UseFetch(endpoint)

    if (error) return <div>failed to load: {error.message} {error.status}</div>
    if (!data) return <div>loading...</div>

    return (
        <div className="w-full md:max-w-3xl 2xl:max-w-5xl max-w-5xl flex flex-col items-center my-7 h-[55rem] glass-component no-backdrop">
            <div className='w-full sm:mt-16 overflow-y-scroll h-[48rem]'>
                {data && data.items.map((el, index) =>
                    <Riga key={index} el={el} />
                )}
            </div>
        </div>
    )
}