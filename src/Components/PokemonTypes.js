import React from "react";

const PokemonTypes = (props) => {
    const allTypes = {
        normal: "bg-pokeType-normal",
        fighting: "bg-pokeType-fighting",
        flying: "bg-pokeType-flying",
        poison: "bg-pokeType-poison",
        ground: "bg-pokeType-ground",
        rock: "bg-pokeType-rock",
        bug: "bg-pokeType-bug",
        ghost: "bg-pokeType-ghost",
        steel: "bg-pokeType-steel",
        fire: "bg-pokeType-fire",
        water: "bg-pokeType-water",
        grass: "bg-pokeType-grass",
        electric: "bg-pokeType-electric",
        psychic: "bg-pokeType-psychic",
        ice: "bg-pokeType-ice",
        dragon: "bg-pokeType-dragon",
        dark: "bg-pokeType-dark",
        fairy: "bg-pokeType-fairy",
        unknown: "bg-pokeType-unknown",
        shadow: "bg-pokeType-shadow",
    }


    return (
        <div>
            {props.types.map((item) => {
                const typeName = item.type.name
                const typeColor = allTypes[typeName];

                if (typeColor) {
                    return (
                        <div key={item.slot} className={`${typeColor} text-white rounded-lg shadow-md w-20 pt-1 pb-2 px-4 mx-1 inline`}>
                            {typeName}
                        </div>
                    )
                } else { return null }
            }
            )}
        </div>
    )
}

export default PokemonTypes;