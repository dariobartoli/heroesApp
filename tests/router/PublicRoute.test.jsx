import { render, screen } from "@testing-library/react"
import { PublicRoute } from "../../src/router/PublicRoute"
import { AuthContext } from "../../src/auth"
import { MemoryRouter, Route, Routes } from "react-router-dom"

describe('Pruebas en <PublicRoute />', () => { 

    test('Debe de mostrar el children si no está autenticado', () => { 

        const contextValue = {
            logged: false
        }
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta pública</h1> //no hace falta comprobar a los children que se envie, solamente con que entre al publicroute y muestre al children
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Ruta pública')).toBeTruthy()
    })

    test('Debe de navegar si está autenticado', () => { 

        const contextValue = {
            logged: true,
            user: {
                name: "pablo",
                id: 'abc123'
            }
        }
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}> //simula un browswrouter, initialEntries(ruta en la que me encuentro)
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta pública</h1> //no hace falta comprobar a los children que se envie, solamente con que entre al publicroute
                            </PublicRoute>
                        } />

                        <Route path="marvel" element={ <h1>pagina de marvel</h1>}/>
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('pagina de marvel')).toBeTruthy()
    })
})