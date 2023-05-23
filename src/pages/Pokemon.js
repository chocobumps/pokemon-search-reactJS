import React from "react";
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./SearchBar"
import FlavorText from "../Components/FlavorText";
import PokemonTypes from "../Components/PokemonTypes";
import getPokemonSpecies from "../Functions/getFlavorText";
import handleImageError from "../Functions/handleImageError";
import handlePlaceholderImage from "../Functions/handlePlaceholderImage";

export const Pokemon = () => {
    const location = useLocation();
    const { state } = location;
    const name = state.name;
    const placeholderImage = handlePlaceholderImage();

    const { data: eachPokemonData } = useQuery(["eachPokemonData"], async () => {
        try {

            //This should be inside this async func as this returns a promise    
            const filteredPokemonName = await getPokemonSpecies(name);

            const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${filteredPokemonName}`);

            const allFlavorText = res.data.flavor_text_entries;
            if (allFlavorText.length !== 0) {
                const engFlavorText = allFlavorText?.filter((item) => {
                    if (item.language.name === "en") {
                        return item
                    } else { return null }
                });

                return engFlavorText[0].flavor_text;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    });

    return (
        location && (
            <div>
                <Link to="/">
                    <p className="text-white m-8 hover:underline underline-offset-2">Go to Home</p>
                </Link>

                <Link to="/search">
                    <p className="text-white m-8 hover:underline underline-offset-2">Go Back</p>
                </Link>

                <div className="flex flex-row flex-wrap justify-center gap-5 mx-auto my-10">
                    <div className="rounded-lg shadow-md w-64 bg-teal-500 shrink overflow-hidden">


                        <div>
                            <img src={state.sprites || placeholderImage} onError={(event) => { handleImageError(event) }} className="object-contain w-full h-48 mt-2" alt="" />
                        </div>

                        <div>
                            <h4 className="text-lg sm:text-xl font-semibold text-white pb-3">
                                {state.name}
                            </h4>
                        </div>

                        <div className="flex justify-center bg-teal-600 pt-3 pb-4">
                            <PokemonTypes types={state.types} />
                        </div>

                        <div className="leading-normal text-white bg-teal-700">
                            <FlavorText eachPokemonData={eachPokemonData} />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}