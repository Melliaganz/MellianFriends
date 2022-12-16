import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {isLogged} from "./_utils/auth/auth.functions";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed"
import Profil from "./components/Profil/Profil"
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import UnloggedHeader from "./components/Header/UnloggedHeader"
import { PageNotFound } from "./components/infos/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isLogged(false))

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <React.Fragment>
      {isLoggedIn 
      ? <Header onLogout={handleLogout}  />  
      :  <UnloggedHeader />}
        <main className="mainContenu">
          <BrowserRouter >
          <Routes>
            <Route path="*" element={<PageNotFound />}/>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/"/> : <Login /> }/>
            <Route path="/register" element={<Register />} />
            <Route path ="/" element={isLoggedIn ? <Feed postQuery="getPosts" createPost={true} /> : <Navigate to="/login" />} exact />
            <Route path="/account/:id" element={ isLoggedIn ? <Profil postQuery="getAllUserPosts"  onLogout={handleLogout} /> : <Navigate to="/login" />}/>
          </Routes>
          </BrowserRouter>
      </main>
    </React.Fragment>
  );
}

export default App;
