import react from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from "./pages/SearchBar"
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from './pages/Home';
import { Pokemon } from './pages/Pokemon';

function App() {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/pokemon" element={<Pokemon />} />
            <Route path="/*" element={<h1>PAGE NOT FOUND</h1>} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div >
  );
}

export default App;

