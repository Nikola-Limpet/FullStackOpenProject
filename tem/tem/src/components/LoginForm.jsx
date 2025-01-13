
const LoginForm = ({ username, password, handleSubmit, handleChangeUsername, handleChangePassword }) => (
  <>
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleChangeUsername}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handleChangePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </>
)

export default LoginForm