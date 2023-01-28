import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Details from './components/Details';
import Navbar from './components/Navbar';
import Posttesti from './components/Posttesti';
import Login from './components/Login';
import { useDispatch } from 'react-redux';
import { getallcars, loadUser, mycars } from './action/user';
import Mybookimg from './components/Mybookimg';
import Mycars from './components/Mycars';
import Homemain from './components/Homemain';
import Carorder from './components/Carorder';

function App() {
  const[sdata,setsdata] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
    dispatch(getallcars())
    dispatch(mycars())
  }, [])
  console.log('df',sdata)
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<>
          <Navbar show={false} tag="home" />
          <Homemain />
        </>} />
        <Route path='/home/:id' element={<>
          <Navbar show={true} searchdata={(v)=>setsdata(v)} tag="home" />
          <Home sdata={sdata} />
        </>} />
        <Route path='/detail/:id' element={<>
          <Navbar show={false} />
          <Details />
        </>

        } />
        <Route path='/post' element={<>
          <Navbar show={false} />
          <Posttesti />
        </>

        } />
        <Route path='/mybooking' element={<>
          <Navbar show={false} />
          <Mybookimg />
        </>


        } />
        <Route path='/mycars' element={<>
          <Navbar show={false} />
          <Mycars />
        </>


        } />

        <Route path='/carorder' element={<>
          <Navbar show={false} />
          <Carorder />
        </>


        } />
        <Route path='/login' element={<>
          <Navbar show={false}/>
          <Login />
        </>

        } />
      </Routes>
    </div>
  );
}

export default App;
