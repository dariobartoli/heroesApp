import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en <PrivateRoute />', () => {
    
    test('Debe de mostrar el children si está autenticado', () => { 

        Storage.prototype.setItem = jest.fn() //verificamos si se llama el localstorage

        const contextValue = {
            logged: true,
            user: {
                name: 'pablo',
                id: '123'
            }
        }
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}> //ponemos otra ruta para probar el lastPath del localstorage
                    <PrivateRoute>
                        <h1>Ruta privada</h1> //no hace falta comprobar a los children que se envie, solamente con que entre al publicroute y muestre al children
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        
        expect(screen.getByText('Ruta privada')).toBeTruthy()

        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman')
    })

});