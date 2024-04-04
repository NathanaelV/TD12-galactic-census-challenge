let result = document.getElementById('result');
let planet_details = document.getElementById('planet_details')
let planet_name = document.getElementById('planet_name')

window.onload = function() {
    printData();
};

async function printData() {
    let res = await fetch('https://swapi.dev/api/planets');

    let {results} = await res.json();

    results.forEach(planet => {
        let li = document.createElement('div');
        li.innerHTML = `<button onclick="printDataPlanet('${planet.url}')">${planet.name}</button>`;
        result.appendChild(li);
    });
}

async function printDataPlanet(planet_url) {
    planet_details.innerHTML = '';
    let res = await fetch(planet_url);
    let planet_data = await res.json();

    planet_details.innerHTML = `
        <strong>Está é o Planeta: ${planet_data.name}</strong><br>
        Clima: ${planet_data.climate}<br>
        Tem ${planet_data.population} habitantes<br>
        Terreno: ${planet_data.terrain}<br>
    `;
    findPeople(planet_data.residents)
};

async function searchPlanetName() {
    planet_details.innerHTML = ''
    let res = await fetch('https://swapi.dev/api/planets');

    let {results} = await res.json();

    results.forEach(planet => {
        if (planet_name.value.toLowerCase() == planet.name.toLowerCase()) {
            printDataPlanet(planet.url)
        }
    });
};

function findPeople(people_url) {
    people_url.forEach(person_url => {
        apiFindPeople(person_url)
    });
};

async function apiFindPeople(person_url) {
    let res = await fetch(person_url);
    let person_data = await res.json();
    planet_details.innerHTML += `Nome: ${person_data.name}</br>`
    planet_details.innerHTML += `Ano de nascimento: ${person_data.birth_year}</br>`
};
