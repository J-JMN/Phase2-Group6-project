import { useState, useEffect } from 'react';

function useFetch(url,requestConfigs={ method: 'Get'}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        setLoading('loading...')
        setData(null);
        setError(null);
        fetch(url,requestConfigs).then((response) => response.json()).then((response) => {            
            setLoading(false);
            console.log(response)
            return response && setData(response);
        })
        .catch(err => {
            setLoading(false)
            setError('An error occurred. Awkward..',err)
        })
    }, [url])
  
    return { data, loading, error }
}
  
export default useFetch;