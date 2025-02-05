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
      {user ? (
        <>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </>
      ) : (
        <Link to="/login">login</Link>
      )}
    </NavBar>
  )
}

export default Navigation