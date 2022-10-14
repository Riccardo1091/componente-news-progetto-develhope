import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function UseFetch(url) {
    const {data, error} = useSWR(url, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        //revalidateOnMount: false
    })

    return {data, error}
}