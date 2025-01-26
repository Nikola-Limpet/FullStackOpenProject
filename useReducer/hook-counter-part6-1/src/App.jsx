import { useContext } from 'react'
import CounterContext from './CounterContext'

const Display = () => {
  const [counter] = useContext(CounterContext)
  return <div>{counter}</div>
}
const Button = ({ type, label }) => {
  const [counter, counterdispatch] = useContext(CounterContext)
  return <button onClick={() => counterdispatch({ type })}>{label}</button>
}

const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </div>
  )
}

export default App