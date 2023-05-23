import './App.css';
import SearchBar from "./pages/SearchBar"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Pokemon } from './pages/Pokemon';

function App() {
  const client = new QueryClient();

  return (
    <div className='App h-screen w-screen bg-blue-700 overflow-scroll'>
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

