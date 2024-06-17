const team = [];

document.getElementById('teamForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const pokemonName = document.getElementById('teamPokemonName').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    if(response.ok) {
        const pokemon = await response.json();
        if (team.length < 2) {
            team.push(pokemon);
            displayTeam();
        } else {
            alert('You can only have 1 Pokémon.');
        }
    } else {
        alert('Pokémon not found!');
    }
});

function displayTeam() {
    const teamList = document.getElementById('teamList');
    teamList.innerHTML = '';
    team.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'col-6 mb-3'; 
        pokemonCard.innerHTML = `
            <div class="card bg-transparent border-0">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title text-white">${pokemon.name}</h5>
                    <p class="card-text text-white">Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                    <p class="card-text text-white">Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                </div>
            </div>
        `;
        teamList.appendChild(pokemonCard);
    });
}

function calculateDamage(attacker, defender) {
    const attackStat = attacker.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defenseStat = defender.stats.find(stat => stat.stat.name === 'defense').base_stat;
    const baseDamage = Math.floor(Math.random() * 10) + 1; 
    const damage = Math.floor(((2 * 50 / 5 + 2) * baseDamage * attackStat / defenseStat) / 50) + 2;
    return damage;
}

document.getElementById('startBattle').addEventListener('click', function() {
    if (team.length !== 2) {
        alert('You need exactly 2 Pokémon to start a battle.');
        return;
    }

    const [pokemon1, pokemon2] = team;
    let pokemon1HP = pokemon1.stats.find(stat => stat.stat.name === 'hp').base_stat;
    let pokemon2HP = pokemon2.stats.find(stat => stat.stat.name === 'hp').base_stat;
    let battleLog = `Battle between ${pokemon1.name} and ${pokemon2.name}\n`;

    const lightning = document.getElementById('lightning');
    const thunderSound = document.getElementById('thunderSound');
    lightning.style.display = 'block';
    thunderSound.play();
    
    setTimeout(() => {
        lightning.style.display = 'none';
        
        while (pokemon1HP > 0 && pokemon2HP > 0) {
            const damageTo2 = calculateDamage(pokemon1, pokemon2);
            const damageTo1 = calculateDamage(pokemon2, pokemon1);
            pokemon2HP -= damageTo2;
            pokemon1HP -= damageTo1;
            battleLog += `${pokemon1.name} deals ${damageTo2} damage to ${pokemon2.name}. ${pokemon2.name}'s HP is now ${pokemon2HP}\n`;
            battleLog += `${pokemon2.name} deals ${damageTo1} damage to ${pokemon1.name}. ${pokemon1.name}'s HP is now ${pokemon1HP}\n`;
        }

        if (pokemon1HP > 0) {
            battleLog += `${pokemon1.name} wins!\n`;
        } else {
            battleLog += `${pokemon2.name} wins!\n`;
        }

        alert(battleLog);
    }, 3000); 
});