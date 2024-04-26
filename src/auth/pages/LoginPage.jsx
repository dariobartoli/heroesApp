import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context"


export const LoginPage = () => {

  const { login } = useContext( AuthContext )

  const navigate = useNavigate()

  const onLogin = () => {
    const lastPath = localStorage.getItem('lastPath') || '/'
    login('Dario Bartoli')
    navigate(lastPath, {
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
