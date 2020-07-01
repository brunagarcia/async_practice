import fetch, { Response } from "node-fetch";

//Add Promise.all to getPokemonArray
// -> Tried and failed with the weird error
//Add type for getEvolvesTo - Create an interface
// -> Didn't create a interface but add the array of strings as the expected output.
//Test getEvolvesTo
// -> :/ Somewhat worked
//Try to get 100% test coverage for the file

interface PokemonDetails {
  name: string;
  pokemonType: string[];
  evolvesTo: string[];
}

interface RawPokemon {
  baby_trigger_item: null;
  chain: {
    evolution_details: any[];
    evolves_to: any[][];
    is_baby: boolean;
    species: Species;
  };
  id: number;
}

interface Species {
  name: string;
  url: string;
}

const charactersURL = "https://pokeapi.co/api/v2/evolution-chain/?limit=3";

const fetchPokemonAPI = async (url: string) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log(err.message);
  }
};

const getPokemonArray = async (baseUrl: string) => {
//colan here will get all the attributes call results and name them urls
  // const { results: urls } = await fetchPokemonAPI(baseUrl);
  // const promises = urls.map((url: string) => fetchPokemonAPI(url));
  // const pokemonArray = await Promise.all(promises);

  // Old way without Promise.all
  const { results: urls } = await fetchPokemonAPI(baseUrl);
  const pokemonArray = [];
  for (let pokemon of urls) {
    const pokemonObject = (await fetchPokemonAPI(pokemon.url)) as RawPokemon;

    pokemonArray.push(pokemonObject);
  }

  return pokemonArray;
};


const getPokemonSpecies = async (speciesUrl: string) => {
  const species = await fetchPokemonAPI(speciesUrl);
  const speciesArray = [];
  for (let specie of species.egg_groups) {
    speciesArray.push(specie.name);
  }
  return speciesArray;
};

export const getEvolvesTo = (evolvesArr: Array<any>): Array<string> => {
  return evolvesArr.map(({ species }) => species.name);
};

const getPokemonDetails = async (pokemon: any): Promise<PokemonDetails> => {
  const details = {
    name: pokemon.chain.species.name,
    pokemonType: await getPokemonSpecies(pokemon.chain.species.url),
    evolvesTo: getEvolvesTo(pokemon.chain.evolves_to),
  };
  return details;
};


export const fetchPokemonDetails = async (url: string) => {
  const pokemonList = await getPokemonArray(url);

  console.time("request time");
  const promises = pokemonList.map((pokemon) => getPokemonDetails(pokemon));
  const pokemonsDetails = await Promise.all(promises);
  console.log(pokemonsDetails);
  console.timeEnd("request time");
  return pokemonsDetails;
};

fetchPokemonDetails(charactersURL);
