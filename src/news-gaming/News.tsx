import React from 'react';
import { useEffect, useState } from 'react';
import { UseFetch } from '../news-gameplay/UseFetch';
import './news.css';

export function News() {
    const [news, setNews] = useState<any>([])
    const [testate, setTestate] = useState<any>([])
    const { data, error } = UseFetch('//localhost:8000/news')

    useEffect(() => {
        setNews(data)
        // Caricare le singole testate nello state per generare i bottoni
        setTestate([...new Set(data?.map((item: { source: any; }) => item.source))])
    }, [data])

    function filtering(e: any) {
        setNews(data)
        setNews((prevNews: any[]) => prevNews.filter((el: { source: any; }) => el.source === e.target.name))
    }

    if (error) return <div>failed to load: {error.message} {error.status}</div>
    if (!data) return <div>loading...</div>

    return (
        <div className="w-full md:max-w-3xl 2xl:max-w-5xl max-w-5xl flex flex-col items-center my-7 h-[55rem] glass-component">
            <div className="w-full flex justify-center flex-wrap sm:flex-nowrap gap-2 static">
                {testate && testate.map((testata: any) =>
                    <button key={testata} onClick={filtering} name={testata} className="btn">
                        {testata.toUpperCase()}
                    </button>)}
            </div>
            <div className='w-full sm:mt-2 overflow-y-scroll h-[48rem]'>
                {news && news.map((el: any) =>
                    <div key={el.title}>
                        <a className='w-full py-2 pr-3 flex items-start hover:opacity-80 hover:bg-white/50 rounded' rel="noreferrer" target="_blank" href={el.url}>
                            <div className="p-2 min-w-[180px] max-w-[180px] sm:w-1/5 sm:min-w-[20%] md:w-1/4 md:min-w-[25%]">
                                <img className="img-fill" src={el.thumbnail} alt={el.title} />
                            </div>
                            <div className="p-1">
                                <h3 className='text-base leading-5 sm:text-lg sm:leading-6 font-bold '>{el.title}</h3>
                                <p className='text-[0.7rem] sm:text-sm'>{el.subtitle}</p>
                                <p className='text-xs italic'>da {el.source}</p>
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}