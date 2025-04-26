import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const usePUT = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const putData = useCallback(async (body) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`An error has occurred: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            toast.success("Settings saved successfully!"); 
            return result;
        } catch (err) {
            setError(err);
            toast.error("Failed to save settings!"); 
        } finally {
            setLoading(false);
        }
    }, [url]);

    const removeMemberData = useCallback(async (updatedAccountData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAccountData),
            });

            if (!response.ok) {
                throw new Error(`An error has occurred: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            toast.success("Member removed successfully!"); 
            return result;
        } catch (err) {
            setError(err);
            toast.error("Failed to remove member!"); 
        } finally {
            setLoading(false);
        }
    }, [url]);

    return { data, loading, error, putData, removeMemberData };
};

export default usePUT;
