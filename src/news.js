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
        <div className="sm:w-full lg:w-5/12 p-4 mx-auto my-7 h-[55rem] glass-component">
            <div className="w-full p-1 flex justify-center gap-2 fixed">
                {testate && testate.map((testata, index) =>
                <button key={index+testata} onClick={filtering} name={testata}>
                    {testata.toUpperCase()}
                </button>)}
            </div>
            <div className='w-full mt-16 overflow-y-scroll h-[48rem]'>
                {news && news.map((el, index) => 
                    <div key={index}>
                        <a className='w-full p-2 flex items-start hover:opacity-80' rel="noreferrer" target="_blank" href={el.url}>
                            <div className="px-2 py-1 min-w-[25%] w-1/4">
                                <img src={el.thumbnail} alt={el.title}/>
                            </div>
                            <div className="p-2">
                                <h3 className='text-xl font-bold leading-5'>{el.title}</h3>
                                <p className='text-sm italic'>da {el.source}</p>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}