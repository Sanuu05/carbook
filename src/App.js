import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getallcars, loadUser, mycars } from './action/user';
import {Details,Navbar,Homemain,Home} from './components/pages'
import {Carorder,Login,Mybookimg,Mycars,Posttesti} from './components/user'

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
