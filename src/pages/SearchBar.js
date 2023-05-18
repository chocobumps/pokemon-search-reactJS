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

        const pokemonPromises = res.data.results.map(async p => {
            try {
                const resDetail = await Axios.get(p.url);

                const newObjPokemon = {
                    name: resDetail.data.name,
                    sprites: resDetail.data.sprites.front_default,
                    id: resDetail.data.id
                };

                return newObjPokemon;
            } catch (error) {
                // Handle the error here (e.g., log it)
                console.log(error)
                return null; // Return null for unsuccessful requests
            }
        });

        const pokemonResults = await Promise.allSettled(pokemonPromises);


        const newArrayOfPokemon = pokemonResults
            .filter(result => result.status === 'fulfilled') // Filter out unsuccessful requests
            .map(result => result.value); // Extract the values of successful requests

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