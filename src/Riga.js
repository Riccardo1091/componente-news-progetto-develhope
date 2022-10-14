import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

export function Riga({ el }) {
    const [showModal, setShowModal] = useState(false)

    function show() {
        setShowModal(true)
    }

    function close(e) {
        e.stopPropagation()
        setShowModal(false)
    }

    return (
        <div onClick={show}>
            <div className='w-full py-2 pr-3 flex items-start hover:opacity-80 hover:bg-white/50 rounded cursor-pointer'>
                <div className="px-2 py-1 min-w-[35%] w-2/6 sm:min-w-[20%] sm:w-1/5">
                    <img src={el.snippet.thumbnails.medium.url} alt={el.snippet.title} />
                </div>
                <h3 className='text-base leading-5 sm:text-lg sm:leading-6 text-black font-bold'>{el.snippet.title}</h3>
            </div>
            {showModal &&
                <div className="w-screen h-screen absolute top-0 left-0 content-center bg-black/[.5] flex items-center justify-center" onClick={close}>
                    <div className="w-fit h-fit bg-white p-8">
                        <FaWindowClose className="absolute right-2 top-2" onClick={close} />
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${el.id.videoId}`} title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </div>
                </div>
            }
        </div>
    )
}