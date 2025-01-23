import { useDispatch } from "react-redux"
import { searchValue } from "../reducers/store"


const Filter = () => {
  const dispatch = useDispatch()

  const handleChnage = (e) => {
    e.preventDefault()
    dispatch(searchValue(e.target.value))
  }

  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      Filter <input onChange={handleChnage} />
    </div>
  )
}

export default Filter