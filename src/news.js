import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function News() {
    const [news, setNews] = useState([])
    const [testate, setTestate] = useState([])
    const {data, error} = useSWR(`//localhost:8000/news`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        //revalidateOnMount: false
    })

    useEffect(() => {
        // Caricare il risultato del fetch nello state
        setNews(data)
        // Caricare le singole testate nello state per generare i bottoni
        setTestate([...new Set(data?.map(item => item.source))])
    }, [data])

    function filtering(e) {
        setNews(data)
        setNews(prevNews => prevNews.filter(el => el.source === e.target.name))
    }

    if (error) return <div>failed to load: {error.message} {error.status}</div>
    if (!data) return <div>loading...</div>

    return (
        <div
            className="w-full md:max-w-3xl 2xl:max-w-5xl max-w-5xl
                flex flex-col items-center p-4 mx-auto my-7 h-[55rem] glass-component">
            <div className="w-full pb-2 flex justify-center flex-wrap sm:flex-nowrap gap-2 static sm:fixed">
                {testate && testate.map((testata, index) =>
                <button key={index+testata} onClick={filtering} name={testata} className="p-2 text-[0.7rem] sm:text-base">
                    {testata.toUpperCase()}
                </button>)}
            </div>
            <div className='w-full sm:mt-16 overflow-y-scroll h-[48rem]'>
                {news && news.map((el, index) => 
                    <div key={index}>
                        <a className='w-full py-2 pr-3 flex items-start hover:opacity-80 hover:bg-white/50 rounded' rel="noreferrer" target="_blank" href={el.url}>
                            <div className="px-2 py-1 min-w-[35%] w-2/6 sm:min-w-[20%] sm:w-1/5">
                                <img src={el.thumbnail} alt={el.title}/>
                            </div>
                            <div>
                                <h3 className='text-base leading-5 sm:text-lg sm:leading-6 text-black font-bold '>{el.title}</h3>
                                <p className='text-[0.7rem] sm:text-sm'>{el.subtitle}</p>
                                <p className='text-xs italic text-slate-800'>da {el.source}</p>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}