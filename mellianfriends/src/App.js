import React from "react";
import './App.css';
import { BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed"

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="mainContenu">
          <Feed />
      </main>
    </React.Fragment>
  );
}

export default App;
