import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";


export function RigaSegnalibri({ el, getData }) {
    const [modal, setModal] = useState(false)
    //const [isSaved, setIsSaved] = useState(saved)

    function toggle(e) {
        e.stopPropagation()
        setModal(!modal)
    }

    return (
        <>
            <div onClick={toggle}>
                <div className='w-full py-2 pr-3 flex items-start hover:opacity-80 hover:bg-white/50 rounded cursor-pointer'>
                    <div className="p-2 sm:w-1/5 sm:min-w-[20%] md:w-1/4 md:min-w-[25%]">
                        <img src={el.attributes.Url} alt={el.attributes.Titolo} />
                    </div>
                    <div className="p-1 flex items-start gap-[0.3rem] flex-col">
                        <h3 className='text-base leading-5 sm:text-lg sm:leading-6 font-bold'>{el.attributes.Titolo}</h3>
                        <p className='text-[0.7rem] sm:text-sm'>{el.attributes.Descrizione}</p>
                        <button onClick={e => getData(e, { id: el.id }, "DELETE")} className="btn mt-2">Rimuovi</button>
                    </div>

                </div>
            </div>
            {modal &&
                <div className="w-fit sm:max-w-2xl absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%] flex items-center justify-center glass-component !p-8" onClick={toggle}>
                    <FaWindowClose className="absolute right-0 top-0 p-1 w-8 h-8 cursor-pointer hover:opacity-50" onClick={toggle} />
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${el.attributes.videoUrl}`} title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                </div>
            }
        </>
    )
}