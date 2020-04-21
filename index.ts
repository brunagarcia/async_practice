import fetch, { Response } from 'node-fetch'

const charactersURL = "https://pokeapi.co/api/v2/evolution-chain/?limit=1"

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

const getPokemonArray = async (baseUrl: string) => {
  const { results: urls } = await fetchPokemonAPI(baseUrl)
  const pokemonArray = []
  for (let pokemon of urls) {
    const pokemonObject = await fetchPokemonAPI(pokemon.url)
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
  //Modify 
}

//mainFunction - Printar todos os pokemons bonitinhos da array
const main = async (url: string) => {
  const arr = await getPokemonArray(url)
  const mainArray = []

  for (let pokemon of arr) {
    let tempObj = {
      'Name': pokemon.chain.species.name,
      'Type': await getPokemonSpecies(pokemon.chain.species.url),
      'EvolvesTo': getEvolvesTo(pokemon.chain.evolves_to)
    }
    console.log(tempObj)
    mainArray.push(tempObj)
  }
}

main(charactersURL)