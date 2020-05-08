import fetch, { Response } from 'node-fetch'


//Add Promise.all to getPokemonArray
//Add type for getEvolvesTo - Create an interface 
//Test getEvolvesTo

interface PokemonDetails {
  name: string;
  pokemonType: string[];
  evolvesTo: string[];
}

interface RawPokemon {
  baby_trigger_item: null,
  chain: {
    evolution_details: any[],
    evolves_to: any[][],
    is_baby: boolean,
    species: Species
  },
  id: number
}

interface Species {
  name: string,
  url: string
}

const charactersURL = "https://pokeapi.co/api/v2/evolution-chain/?limit=3"

// fetch(charactersURL)
//   .then(res => res.json())
//   .then(json => console.log(json.results[0]))
//   .catch(err => console.error(err))

const fetchPokemonAPI = async (url: string) => {
  try {
    const res = await fetch(url)
    const json = await res.json()
    // console.log(json)
    return json
  } catch (err) {
    console.log(err.message)
  }
}

const getPokemonArray = async (baseUrl: string) : Promise<RawPokemon[]> => {
  const { results: urls } = await fetchPokemonAPI(baseUrl)
  const pokemonArray = []
  for (let pokemon of urls) {
    const pokemonObject = (await fetchPokemonAPI(pokemon.url)) as RawPokemon
    console.log(pokemonObject)
    pokemonArray.push(pokemonObject)
  }
  // console.log(pokemonArray)
  return pokemonArray
}

//getPokemonSpecies
const getPokemonSpecies = async (speciesUrl: string) => {
  const species = await fetchPokemonAPI(speciesUrl)
  const speciesArray = []
  for (let specie of species.egg_groups) {
    speciesArray.push(specie.name)
  }
  return speciesArray
}

//getEvolvesTo
const getEvolvesTo = (evolvesArr: Array<any>) => {
  return evolvesArr.map(({ species }) => species.name) 
}

// the colan after the type will always mean that this function should return the specific value. 
const getPokemonDetails = async (pokemon: any) : Promise<PokemonDetails> => {

  const details = {
    name: pokemon.chain.species.name,
    pokemonType: await getPokemonSpecies(pokemon.chain.species.url),
    evolvesTo: getEvolvesTo(pokemon.chain.evolves_to)
  }
  //returns array of promises 
  return details 
}

//mainFunction - Printar todos os pokemons bonitinhos da array
const main = async (url: string) => {
  const pokemonList = await getPokemonArray(url)
  console.time("request time")
    

    // const promises = pokemonList.map(pokemon => getPokemonDetails(pokemon))
    const promises = pokemonList.map(getPokemonDetails)

    //Using the array of promises as parameter for the promise.all 
    const pokemonsDetails = await Promise.all(promises)
    console.log(pokemonsDetails)

  // for (let pokemon of pokemonList) {
  //   const pokemonDetails = await getPokemonDetails(pokemon)
  //   console.log(pokemonDetails)
  //   mainArray.push(pokemonDetails)
  // }
  console.timeEnd("request time")
}

main(charactersURL)