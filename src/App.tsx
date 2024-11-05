import React, { useState } from 'react';


const App: React.FC = () => {

  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const handleSearch = async () => {
    if (!pokemonName.trim()) return; 
    setLoading(true);
    setError('');
    setPokemonData(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

 
  const renderPokemonData = () => {
    if (!pokemonData) return null;

    return (
      <div>
        <h2>{pokemonData.name.toUpperCase()}</h2>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        <h3>Habilidades:</h3>
        <ul>
          {pokemonData.abilities.map((ability: any) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
        <h3>Tipos:</h3>
        <ul>
          {pokemonData.types.map((type: any) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
      </div>
    );
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

 
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='container'>
      <h1>Busqueda de pokemon</h1>
      <input
        type="text"
        placeholder="Ingresa el nombre del Pokémon"
        value={pokemonName}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button style={{ marginTop: '10px' }} onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {renderPokemonData()}
    </div>
  );
};

export default App;
