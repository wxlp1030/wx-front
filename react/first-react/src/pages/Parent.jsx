import react from 'react'
import Child from './Child'

export default function Parent () {
    const [msg, setMsg] = react.useState('')
    function getMsg(msg) {
        setMsg(msg)
    }
    return <div>
        <Child fun={getMsg}></Child>
        {msg}
    </div>
}