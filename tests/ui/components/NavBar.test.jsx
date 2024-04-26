import { fireEvent, render, screen } from "@testing-library/react";
import { NavBar } from "../../../src/ui/components/NavBar";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter, useNavigate } from "react-router-dom";

//en este caso usamos la path de la libreria, que es de lo que queremos hacer el mock
//no usamos un path local porque viene de la libreria, y luego hacemos el return value

//podemos hacer mock de librerias completas
const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), //usa todo lo que trae la libreria y esparcelo
    useNavigate: () => mockedUseNavigate // solo sobreescribimos el useNavigate
}))

describe('Pruebas en <NavBar />', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'juan',
            id: 'abc'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks()) //limpar las funciones de jest
    
    test('debe de mostrar el nombre del usuario logeado', () => {


        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <NavBar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        //screen.debug()
        expect(screen.getByText('juan')).toBeTruthy()
        
    });

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <NavBar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button')
        fireEvent.click(logoutBtn)

        expect(contextValue.logout).toHaveBeenCalled()
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true})

    });
});