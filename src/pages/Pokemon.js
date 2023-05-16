import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import '../SearchBar.css';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./SearchBar"


// export const Pokemon = () => {
//     const location = useLocation();
//     const { item } = location.state;

//     // const { data: pokemonData } = useQuery(["pokemonItem"], async () => {
//     //     const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonItem.name}`)

//     // });

//     return (
//         <div>


//             <div>
//                 <p>{item}</p>
//                 <h1>POKEMON DETAILS</h1>

//             </div>


//         </div>
//     )
// }

export const Pokemon = (props) => {
    const location = useLocation();
    console.log(location)
    return (
        location && (
            <div>
                <div>
                    <Link to="/">Home</Link>
                </div>

                <img src={location.state.sprites} />
                <p>{location.state.name}</p>

            </div>
        )
    )
}