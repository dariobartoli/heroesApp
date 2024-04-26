import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import queryString from "query-string"
import { getHeroesByname } from "../helpers/getHeroesByName"
import { HeroCard } from "../components/HeroCard"


export const SearchPage = () => {

  const navigate = useNavigate()
  const location = useLocation() //para ver los queryparams
  //instalar el paquete query-string para que sea mas facil extraer esas query
  const { q = ''} = queryString.parse(location.search) //nos separa las query de manera sencilla
  const heroes = getHeroesByname(q)

  const {searchText, onInputChange} = useForm({
    searchText: q,
  })

  const onSearchSubmit = (e) => {
    e.preventDefault()
    
    navigate(`?q=${searchText}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr/>

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr/>
          <form onSubmit={onSearchSubmit} aria-label="form">
            <input type="text" name="searchText" id="" placeholder="Searh a hero" className="form-control" autoComplete="off" value={searchText} onChange={onInputChange}/>

            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr/>

          {
            (q === '') 
              ? <div className="alert alert-primary">Search a hero</div>
              : (heroes.length === 0) && <div className="alert alert-danger">No hero With <b>{q}</b></div>
          }
          
          {
            heroes.map( hero => (
              <HeroCard key={hero.id} {...hero}/>
            ))
          }
        </div>
      </div>
    </>
  )
}
