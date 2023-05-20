import React from "react";

const FlavorText = (props)=> {

    const newPokemonFlavorText = props.eachPokemonData?.replaceAll('\f', ' ');
    
        return (
                <p className="p-6">{newPokemonFlavorText}</p>                      
        )
        }

export default FlavorText;