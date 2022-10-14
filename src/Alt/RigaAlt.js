import { ModalAlt } from "./ModalAlt";

export function RigaAlt({ el, showModal, show, close }) {

    return (
        <div onClick={show}>
            <div className='w-full py-2 pr-3 flex items-start hover:opacity-80 hover:bg-white/50 rounded cursor-pointer'>
                <div className="px-2 py-1 min-w-[35%] w-2/6 sm:min-w-[20%] sm:w-1/5">
                    <img src={el.snippet.thumbnails.medium.url} alt={el.snippet.title} />
                </div>
                <h3 className='text-base leading-5 sm:text-lg sm:leading-6 text-black font-bold '>{el.snippet.title}</h3>
            </div>
            {showModal && <ModalAlt close={close} el={el} />}
        </div>
    )
}