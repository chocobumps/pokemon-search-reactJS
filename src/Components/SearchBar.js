// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import Axios from "axios";
// import { useState } from 'react';

// function SearchBar({ placeholder }) {
//     const [searchPokemon, setSearchPokemon] = useState("");
//     const [results, setResults] = useState(null);

//     const handleInputChange = (event) => {
//         setSearchPokemon(event.target.value)
//     }

//     const handleClick = async () => {
//         const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
//         setResults(res.data)
//     }

//     const handlePokemonClick = async () => {
//         const res = await Axios.get('https://pokeapi.co/api/v2/evolution-chain')
//         console.log(res.data)
//         for (let i = 1; i <= res.data.count; i++) {
//             let evolution = await Axios.get(`https://pokeapi.co/api/v2/evolution-chain/${i}`)

//             let pokemonName = evolution.chain.evolves_to[0].species.name;

//             if (pokemonName === searchPokemon) {
//                 console.log(evolution.chain.evolves_to[0].evolves_to[0].species.name);
//                 return evolution.chain.evolves_to[0].evolves_to[0].species.name;
//             }
//         }
//     }

//     return (
//         <div>
//             <input type='text' value={searchPokemon} onChange={handleInputChange}></input>
//             <button onClick={handleClick}>Search</button>

//             {results &&
//                 <div>
//                     <img src={results.sprites.front_default} alt='oops' />
//                     <p onClick={handlePokemonClick}>{results.name}</p>

//                 </div>
//             }
//         </div>
//     )

// }

// export default SearchBar;

import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import './SearchBar.css';

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

        // const newArrayOfPokemon = res.data.results.map(async p => {
        //     const resDetail = await Axios.get(p.url);

        //     const newObjPokemon = {
        //         pokemon: resDetail.data.pokemon.name,
        //         sprite: resDetail.data.sprites.front_default
        //     }
        //     console.log("obj pokemon", newObjPokemon)
        //     return newObjPokemon;
        // })
        // console.log("new arr pokemon", newArrayOfPokemon)
        // console.log("pokemonData", pokemonData)
        // return newArrayOfPokemon;
    });

    // const { data: pokemonImage } = useQuery(["pokemonImage"], async () => {
    //     const res = await Axios.get(pokemonData.url)
    // })

    // const { data: pokemonImage } = useQuery(["pokemonImage"], async () => {
    //     const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon-form/${searchWord}`)
    //     const data = res.data
    //     console.log(res.data)
    //     return getPokemonSprites(data)
    // });

    // const getPokemonSprites = (data) => {
    //     if (data.pokemon.name.toLowerCase().includes(searchWord.toLowerCase)) {
    //         console.log(data.sprites.front_default)
    //         return data.sprites.front_default
    //     }
    // }



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
            <div className="searchInput">
                <input type="text" placeholder="Enter a Pokemon name..." value={wordEntered} onChange={handleFilter} />
                <div className="searchIcons">
                    {wordEntered.length === 0 ?
                        <span>&#128270;</span> :
                        <span id="clearBtn" onClick={handleClearBtn}>&#10006;</span>
                    }
                </div>
            </div>
            {filteredData?.length !== 0 &&
                <div className="dataResult">
                    {filteredData?.slice(0, 15).map((item) => (
                        <div className="dataResultItems" key={item.id}>
                            <img src={item.sprites} alt="oops! sorry not available" />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            }

        </div>
    );
}

export default SearchBar;