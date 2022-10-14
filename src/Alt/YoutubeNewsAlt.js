import React, { useEffect, useState } from "react";
import { RigaAlt } from "./RigaAlt";
import { UseFetch } from "./UseFetch";

const endpoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCKy1dAqELo0zrOtPkf0eTMw&maxResults=25&q=first%20minutes&type=videos&key=${process.env.REACT_APP_key}`

export function YoutubeNewsAlt() {
    const { data, error } = UseFetch(endpoint)
    const [righe, setRighe] = useState([])

    useEffect(() => {
        if (data) {
            setRighe(Array(data.items.length).fill(false))
        }
    }, [data]);

    function show(index) {
        const righeCopy = [...righe]
        righeCopy[index] = true
        setRighe(righeCopy)
    }

    function close(e, index) {
        e.stopPropagation()
        const righeCopy = [...righe]
        righeCopy[index] = false
        setRighe(righeCopy)
    }

    if (error) return <div>failed to load: {error.message} {error.status}</div>
    if (!data) return <div>loading...</div>

    return (
        <div className="w-full md:max-w-3xl 2xl:max-w-5xl max-w-5xl flex flex-col items-center my-7 h-[55rem] glass-component">
            <div className='w-full sm:mt-16 overflow-y-scroll h-[48rem]'>
                {data && data.items.map((el, index) =>
                    <RigaAlt close={(e) => close(e, index)} show={(e) => show(index)} showModal={righe[index]} key={index} el={el} />
                )}
            </div>
        </div>
    )
}