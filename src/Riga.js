import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";

export function Riga({ el, saved, getData, isMobile }) {
    const [modal, setModal] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    function toggle(e) {
        e.stopPropagation()
        setModal(!modal)
    }

    useEffect(() => {
        setIsSaved(saved)
    }, [saved]);

    const video = {
        Titolo: el.snippet.title,
        Descrizione: el.snippet.description,
        Url: el.snippet.thumbnails.medium.url,
        videoUrl: el.id.videoId,
        isSaved: true
    }

    return (
        <div onClick={toggle}>
            <div className='w-full py-2 pr-3 flex items-start hover:opacity-80 hover:bg-white/50 rounded cursor-pointer'>
                <div className="p-2 min-w-[180px] max-w-[180px] sm:w-1/5 sm:min-w-[20%] md:w-1/4 md:min-w-[25%]">
                    <img src={el.snippet.thumbnails.medium.url} alt={el.snippet.title} />
                    {!isSaved && isMobile && <button onClick={e => getData(e, video, "POST")} className="btn mt-4">Salva</button>}
                </div>
                <div className="p-1 flex items-start gap-1 flex-col">
                    <h3 className='text-base leading-5 sm:text-lg sm:leading-6 font-bold'>{el.snippet.title}</h3>
                    <p className='text-[0.7rem] sm:text-sm'>{el.snippet.description}</p>
                    {!isSaved && !isMobile && <button onClick={e => getData(e, video, "POST")} className="btn mt-4">Salva</button>}
                </div>
            </div>
            {modal &&
                <div className="w-full h-full rounded absolute top-0 left-0 content-center bg-black/[.5] flex items-center justify-center" onClick={toggle}>
                    <div className="w-fit h-fit glass-component !p-8 relative">
                        <FaWindowClose className="absolute right-0 top-0 p-1 w-8 h-8 cursor-pointer hover:opacity-50" onClick={toggle} />
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${el.id.videoId}`} title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </div>
                </div>
            }
        </div>
    )
}