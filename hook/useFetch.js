import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async() =>{
        setLoading(true)
        console.log(url)
        try {
            const response = await axios.get(url)
            setData(response.data)
        } catch (error) {
            setError(error)
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [url])

    const refetch = ()=>{
        setLoading(true)
        fetchData()
    }
    
    return { data, loading, error, refetch }
}
export default useFetch