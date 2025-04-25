import { useState, useEffect, useCallback } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading('loading...')
        setData(null);
        setError(null);

        fetch(url).then((response) => response.json()).then((response) => {            
            setLoading(false);
            console.log(response)
            return response && setData(response);
        })
        .catch(err => {
            setLoading(false)
            setError('An error occurred.',err)
        })
      }, [url]);
  
    useEffect(() => {
        fetchData()
    }, [fetchData])
  
    return { data, loading, error, refetch: fetchData }
}
  
export default useFetch;