import React from 'react'
import { NavBar } from '../../ui'
import { DcPage, MarvelPage, HeroPage, SearchPage } from '../pages'
import { Navigate, Route, Routes } from 'react-router-dom'
export const HeroesRoutes = () => {
  return (
    <>
        <NavBar />

        <div className='container'>
            <Routes>
                <Route path="marvel" element={<MarvelPage />}/>
                <Route path="dc" element={<DcPage />}/>
                <Route path="search" element={<SearchPage />}/>
                <Route path="hero/:id" element={<HeroPage />}/>

                <Route path="/" element={<Navigate to={'/marvel'}/>}/>
            </Routes>
        </div>
    </>
  )
}
