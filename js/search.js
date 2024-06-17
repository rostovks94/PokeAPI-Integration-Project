document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    if(response.ok) {
        const pokemon = await response.json();
        displayPokemon(pokemon);
        document.getElementById('searchForm').style.display = 'none'; 
    } else {
        alert('Pokémon not found!');
    }
});

function displayPokemon(pokemon) {
    const pokemonInfo = document.getElementById('pokemonInfo');
    pokemonInfo.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <h3>Stats:</h3>
        <p>HP: ${pokemon.stats[0].base_stat}</p>
        <p>Attack: ${pokemon.stats[1].base_stat}</p>
        <p>Defense: ${pokemon.stats[2].base_stat}</p>
        <p>Special-Attack: ${pokemon.stats[3].base_stat}</p>
        <p>Special-Defense: ${pokemon.stats[4].base_stat}</p>
        <p>Speed: ${pokemon.stats[5].base_stat}</p>
    `;
    pokemonInfo.style.marginTop = "100px"; 
}