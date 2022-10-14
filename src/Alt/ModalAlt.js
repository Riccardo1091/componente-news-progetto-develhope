import { FaWindowClose } from "react-icons/fa";

export function ModalAlt({ el, close }) {
    return (
        <div className="w-full h-full absolute top-0 left-0 content-center bg-black/[.5]">
            <div className="w-80 bg-white relative">
                <FaWindowClose className="absolute right-2 top-2 cursor-pointer" onClick={close} />
                {el.id.videoId}
            </div>
        </div>
    )
}