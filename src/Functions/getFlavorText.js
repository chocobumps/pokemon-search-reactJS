import axios from "axios";

export default async function getPokemonSpecies(pokeName) {

    //removed limiter
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=2000&offset=0`);
    const results = res.data.results;

    const filteredPokemonName = results.filter((item) => {
        if (pokeName.includes(item?.name)) {
            return item.name
        } else {
            return null;
        }
    });
    // console.log(filteredPokemonName)
    // console.log(pokeName)
    const newPokemonName = filteredPokemonName[0].name;
    // console.log("What Pokemon is this?:", newPokemonName);
    return newPokemonName;
}