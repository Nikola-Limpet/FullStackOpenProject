
import { useContext } from "react"
import { NotifyContext } from "../notifyContext"
const Notifications = () => {
  const [message, setMessage] = useContext(NotifyContext)

  if (message === '') {
    return null
  }
  return (
    <div style={{ border: 'solid', padding: 10 }}>
      {message}
    </div>
  )
}

export default Notifications