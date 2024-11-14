import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonInfo = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  // using Pikachu here for example id = 25)
  const pokemonId = 25;
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-container">
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      
      {/* Display Pokemon Sprites */}
      <div className="sprites">
        <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
        <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
        <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny front`} />
      </div>

      {/* Display 3 Moves */}
      <div className="moves">
        <h2>Moves</h2>
        <ul>
          {pokemon.moves.slice(0, 3).map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonInfo;
