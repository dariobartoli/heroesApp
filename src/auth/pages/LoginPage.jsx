import { useNavigate } from "react-router-dom"


export const LoginPage = () => {

  const navigate = useNavigate()

  const onLogin = () => {
    navigate('/marvel', {
      replace: true //reemplazar el historial
    })
  }
  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr/>
      <button className="btn btn-primary" onClick={ onLogin }>
        login
      </button>
    </div>
  )
}
