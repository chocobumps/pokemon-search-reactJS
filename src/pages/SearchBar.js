import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import '../SearchBar.css';
import { Link } from "react-router-dom";
import "./Pokemon"

const SearchBar = () => {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const { data: pokemonData } = useQuery(["pokemon"], async () => {
        const res = await Axios.get('https://pokeapi.co/api/v2/pokemon-form/?limit=2000&offset=0')

        const newArrayOfPokemon = await Promise.all(res.data.results.map(async p => {
            const resDetail = await Axios.get(p.url);

            // promise = [[state],[promise = [[state],[content]],promise = [[state],[content]]]];

            const newObjPokemon = {
                name: resDetail.data.name,
                sprites: resDetail.data.sprites.front_default,
                id: resDetail.data.id
            }
            return newObjPokemon;
        }))
        return newArrayOfPokemon;

    });

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord)
        const newFilter = pokemonData?.filter((value) => {
            if (value?.name?.toLowerCase().includes(searchWord.toLowerCase())) {
                return value
            }

        });
        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter);
        }
    }

    const handleClearBtn = () => {
        setWordEntered("")
        setFilteredData([])
    }


    

    return (
        <div className="search">

            <Link to="/">Home</Link>

            <div className="searchInput">
                <form className="max-w-sm px-4">
                <div className="relative">
                {wordEntered.length === 0 ? 
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                    :

                <svg onClick={handleClearBtn}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    
                >
                    <path 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>

                }
                
                <input type="text" placeholder="Enter a Pokemon name..." value={wordEntered} onChange={handleFilter} className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"/>
                
                {/* <div className="searchIcons">
                    {wordEntered.length === 0 ?
                        <span>&#128270;</span> :
                        <span id="clearBtn" onClick={handleClearBtn}>&#10006;</span>
                    }
                </div> */}
                </div>
                </form>
            </div>

            {filteredData?.length !== 0 &&
                <div className="dataResult">
                    {filteredData?.slice(0, 15).map((item) => (
                        item && (
                            <div className="dataResultItems" key={item.id}>

                                <Link to="/pokemon"
                                    state={item}>

                                    <img src={item.sprites} alt="oops! sorry not available" />
                                    <p>{item.name}</p>

                                </Link>
                            </div>
                        )

                    ))}
                </div>
            }
        </div >
    );
}

export default SearchBar;