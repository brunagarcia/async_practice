import { getEvolvesTo, fetchPokemonDetails } from "./index";
// import fetch from "node-fetch";

// jest.mock("fetch");

//Mock the fetchPokemonApi function instead of the actual API fetch call.

const sampleData = [
  {
    evolution_details: [],
    evolves_to: [],
    is_baby: false,
    species: {
      name: "keith",
      url: "https://pokeapi.co/api/v2/pokemon-species/2/",
    },
  },
];

const mockPromise = new Promise((resolve, reject) => {
  // if (err) {
  //   reject(err);
  //   return;
  // }
  resolve(sampleData);
});

afterAll(() => {
  //Clear mock
  //  return clearCityDatabase();
  //  global.fetch.mockClear();
  //  delete global.fetch;
});

//Go through each part of the function and test each one

const URL = "https://pokeapi.co/api/v2/evolution-chain/?limit=1";

describe("Test all the pokemons", () => {
  test("test the fetchPokemonDetails", (done) => {
    const mockSuccessResponse = {
      name: "bulbasaur",
      pokemonType: ["plant", "monster"],
      evolvesTo: ["ivysaur"],
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const results = fetchPokemonDetails(URL);

    expect(results).toEqual([
      {
        name: "bulbasaur",
        pokemonType: ["plant", "monster"],
        evolvesTo: ["ivysaur"],
      },
    ]);
  });
  //Check if promises gets assigned the right value
  //PokemonDetails should wait the promises and get the values.
  test("to return a array with strings", () => {
    (global as any).fetch = jest.fn().mockImplementation(() => mockPromise);
    const results = getEvolvesTo(sampleData);
    expect(results).toEqual(["keith"]);
  });
});
