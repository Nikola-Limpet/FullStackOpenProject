import { JSX } from 'react'

interface WelcomeProps {
  name: string;

}
const Welcome = (props: WelcomeProps): JSX.Element => {
  return <h1>Hello, {props.name}</h1>;
}
const App = () => {
  return (
    <div>
      <Welcome name='Sok eng' />
    </div>
  )
}

export default App