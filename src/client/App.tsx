import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Settings from './pages/Settings';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import { UserData } from '../Types';
import { intoleranceObj } from './utils/dataObjects';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    intolerance: intoleranceObj,
    favorites: [],
  });

  // TODO: ADD ENDPOINT TO CHECK IF SESSION EXISTS AND, IF SO, REDIRECT TO HOME PAGE
  // useEffect(() => {
  //   axios.get('')
  // }, []);

  function logIn(): void {
    setIsLoggedIn(true);
    axios
      .get('/api/favorites')
      .then(({ data }) => {
        setUserData(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <ul>
        Dev Toolbar
        <li>
          {' '}
          <NavLink to='/'>Home</NavLink>{' '}
        </li>
        <li>
          {' '}
          <NavLink to='/signup'>Sign Up</NavLink>{' '}
        </li>
        <li>
          {' '}
          <NavLink to='/login'>Log In</NavLink>{' '}
        </li>
        <li>
          {' '}
          <NavLink to='/settings'>Settings</NavLink>{' '}
        </li>
        <li>
          {' '}
          <NavLink to='/search'>Search</NavLink>{' '}
        </li>
        --------------------------------------------
      </ul>
      <Routes>
        {!isLoggedIn && (
          <Route
            path='/'
            element={<LogIn logIn={() => setIsLoggedIn(true)} />}
          />
        )}
        <Route
          path='/'
          // element={isLoggedIn ? <Home /> : <SignUp />}
          element={<Home userData={userData} />}
        />
        <Route
          path='/signup'
          element={<SignUp logIn={() => setIsLoggedIn(true)} />}
        />
        <Route
          path='/login'
          element={<LogIn logIn={logIn} />}
        />
        <Route
          path='/settings'
          element={<Settings />}
        />
        <Route
          path='/search'
          element={<Search />}
        />
      </Routes>
    </>
  );
}
