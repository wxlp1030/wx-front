export default function Child(props) {
    return <div>
        <h1>Child组件</h1>
        <button onClick={() => props.fun('hello 父组件')  }>点击一下</button>
    </div>
}