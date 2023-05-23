import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { Link } from "react-router-dom";
import "./Pokemon"

const SearchBar = () => {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const { data: pokemonData, isLoading, isError } = useQuery(["pokemon"], async () => {
        const res = await Axios.get('https://pokeapi.co/api/v2/pokemon/?limit=2000&offset=0')

        const pokemonPromises = res.data.results.map(async p => {
            try {
                const resDetail = await Axios.get(p.url);

                const newObjPokemon = {
                    name: resDetail.data.name,
                    sprites: resDetail.data.sprites.front_default,
                    id: resDetail.data.id,
                    types: resDetail.data.types,
                };

                return newObjPokemon;
            } catch (error) {
                // Handle the error here (e.g., log it)
                // console.log(error)
                return null; // Return null for unsuccessful requests
            }
        });

        const pokemonResults = await Promise.allSettled(pokemonPromises);

        const newArrayOfPokemon = pokemonResults
            .filter(result => result.status === 'fulfilled') // Filter out unsuccessful requests
            .map(result => result.value); // Extract the values of successful requests

        return newArrayOfPokemon;

    }, {
        cacheTime: 1000 * 60 * 60,
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error occured while fetching data.</p>
    }

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord)
        const newFilter = pokemonData?.filter((value) => {
            if (value?.name?.toLowerCase().includes(searchWord.toLowerCase())) {
                return value
            } else { return null }

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
        <div className="">

            <Link to="/">
                <p className="text-white m-8 hover:underline underline-offset-2">Go to Home</p>
            </Link>

            <div className="w-full flex justify-center">

                <div className="max-w-sm px-4">
                    <div className="relative">
                        {wordEntered.length === 0 ?
                            <div>
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
                            </div>

                            :
                            <div onClick={handleClearBtn}>
                                <svg
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
                            </div>
                        }

                        <input type="text" placeholder="Enter a Pokemon name..." value={wordEntered} onChange={handleFilter} className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600" />

                    </div>
                </div>
            </div>

            {filteredData?.length !== 0 &&
                <div className="flex flex-row flex-wrap justify-center gap-5 mx-auto my-10">
                    {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-20 my-8 "> */}
                    {filteredData?.slice(0, 15).map((item) => (
                        item && (
                            <div className="rounded-lg shadow-md h-72 w-64 bg-teal-500 shrink
                            transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300
                            " key={item.id}>

                                <Link to="/pokemon"
                                    state={item}>

                                    <div className="p-2">
                                        <img src={item.sprites} alt="oops! sorry not available" className="object-contain w-full h-48 " />
                                    </div>

                                    <div>
                                        <h4 className="text-lg sm:text-xl font-semibold text-white">{item.name}</h4>

                                        <p className="mb-2 leading-normal"></p>
                                    </div>


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