
// const [value, setValue] = useState('');

// const onChange = (event) => {
//   setValue(event.target.value);
// }

// const onSearch = async (searchTerm) => {
//   // our API to fetch the search result
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
//   const pokemon = await response.json();
//   console.log(pokemon);
// }

// return (
//   <div className='App'>
//     <h1> Search </h1>

//     <div className='search-container'>
//       <div className='search-inner'>
//         <input type='text' value={value} onChange={onChange} />
//         <button onClick={() => onSearch(value)}> Search </button>
//       </div>

//       <div className='dropdown'>

//       </div>
//     </div>
//   </div>

// );

import react from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from "./Components/SearchBar"
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const client = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <SearchBar />
      </QueryClientProvider>
    </div >
  );
}

export default App;
