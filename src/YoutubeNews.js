import React, { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Riga } from "./Riga";
import { RigaSegnalibri } from "./RigaSegnalibri";
import { UseFetch } from "./UseFetch";
import "./RigaSegnalibri.css"

const youtubeAPI = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCKy1dAqELo0zrOtPkf0eTMw&maxResults=25&q=gameplay&type=videos&key=${process.env.REACT_APP_key}`

export function YoutubeNews() {
    const { data, error } = UseFetch(youtubeAPI)
    const [modal, setModal] = useState(false)
    const [segnalibri, setSegnalibri] = useState([])

    function fetchSet() {
        fetch("//localhost:1337/api/segnalibros")
            .then((res) => res.json())
            .then(res => setSegnalibri(res.data))
    }

    function getData(e, segnalibro, type) {
        e.stopPropagation()
        if (type === "DELETE") {
            fetch(`//localhost:1337/api/segnalibros/${segnalibro.id}`, { method: "DELETE" })
                .then(setTimeout(fetchSet, 20))
            return
        }
        fetch("//localhost:1337/api/segnalibros", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: segnalibro })
        }).then(fetchSet())
    }

    useEffect(() => {
        fetchSet()
    }, [])

    function toggle(e) {
        e.stopPropagation()
        setModal(!modal)
    }

    if (error) return <div>failed to load: {error.message} {error.status}</div>
    if (!data) return <div>loading...</div>

    return (
        <div className="max-w-5xl relative md:max-w-3xl 2xl:max-w-5xl flex flex-col items-center my-7 h-[55rem] glass-component">
            <div className="w-[90%] first-line:pb-2 flex justify-center flex-wrap gap-2 static sm:fixed">
                <button onClick={toggle} className="btn">SEGNALIBRI</button>
            </div>
            {modal &&
                <div className="h-auto z-10 absolute top-0 flex justify-start flex-col glass-component glass-opaco overflow-y-scroll" onClick={toggle}>
                    <FaWindowClose className="absolute right-0 top-0 p-1 w-8 h-8 cursor-pointer hover:opacity-50" onClick={toggle} />
                    {segnalibri && segnalibri.map(segnalibro =>
                        <RigaSegnalibri getData={getData} saved={false} key={segnalibro.attributes.Titolo} el={segnalibro} />
                    )}
                </div>
            }
            <div className='w-full sm:mt-16 overflow-y-scroll h-full'>
                {data && data.items.map((el, index) => {
                    //if (segnalibri.map(e => e.attributes.Titolo).indexOf(el.snippet.title) !== -1) {
                    if (segnalibri.some(e => e.attributes.Titolo === el.snippet.title)) {
                        return <Riga saved={true} key={index} el={el} />
                    }
                    return <Riga getData={getData} fetchSet={fetchSet} saved={false} key={el.snippet.title} el={el} />
                })}
            </div>
        </div>
    )
}