import React, {useEffect, useState} from 'react';
import axios from 'axios'

export default  function Home () {
    const [res, setRes] = useState('');
    useEffect(() => {
        axios({
            url:'http://localhost:8888/get',
            method: 'GET'
        }).then((res) => {
            console.log(res);
            setRes(res.data)
        })
    },[])
    if (!res) {
        return <h1>home</h1>
    }
    return <h1>{res}</h1>;
}
