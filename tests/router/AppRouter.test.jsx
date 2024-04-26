import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from '../../src/router/AppRouter'

describe('Pruebas en <AppRouter />', () => {
    
    test('debe de mostrar el login si no está autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter /> 
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getAllByText('Login').length).toBe(1)
    });

    test('debe de mostrar el componente marvel si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'pablo',
                id: '123'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter /> 
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getAllByText('Marvel').length).toBe(1)


    });
});