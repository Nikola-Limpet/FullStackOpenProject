import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const NavBar = styled.nav`
  padding: 1em;
  background: lightgray;
`

const Navigation = ({ user, handleLogout }) => {
  return (
    <NavBar>
      <Link to="/">blogs</Link> |
      <Link to="/users">users</Link> |
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </NavBar>
  )
}

export default Navigation