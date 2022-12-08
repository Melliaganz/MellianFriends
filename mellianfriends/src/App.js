import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed"
import Profil from "./components/Profil/Profil"
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="mainContenu">
          <BrowserRouter >
          <Routes>
          <Route path="/Register" element={<Register />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/" element={<Feed />}/>
          <Route path="/profile" element={<Profil />} />
          </Routes>
          </BrowserRouter>
      </main>
    </React.Fragment>
  );
}

export default App;
