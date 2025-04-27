import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const useDelete = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url+'/'+id, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
            throw new Error(`An error has occurred: ${response.status}`);
            }
    
            const result = await response.json();
            setData(result);
            toast.success('Successfully deleted', { autoClose: 2000 });
            return result;
        } catch (err) {
            setError(err);
            toast.error("Failed to save data!"); 
        } finally {
            setLoading(false);
        }
    }, [url]);

    return { data, loading, error, deleteData };
};

export default useDelete;