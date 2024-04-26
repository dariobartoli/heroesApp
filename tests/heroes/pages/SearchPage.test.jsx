import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <SearchPage />', () => {


    beforeEach(() => jest.clearAllMocks())
    
    test('debe de mostrarse correctamente con valores por defecto', () => {
        
        const {container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        )

        //screen.debug()
        expect(container).toMatchSnapshot()
    });

    test('debe de mostrar batman y el input con el valor del querystring', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('batman')

        const img = screen.getByRole('img')
        expect(img.src).toContain(`/assets/heroes/dc-batman.jpg`)

    });

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        )
        expect(screen.getByText('No hero With')).toBeTruthy()
        
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        fireEvent.change( input, {target: {name: 'searchText', value: 'superman'}})
        console.log(input.value);

        const form = screen.getByRole('form')
        fireEvent.submit(form)

        expect( mockedUseNavigate).toHaveBeenCalledWith('?q=superman')


    });
});