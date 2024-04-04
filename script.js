let result = document.getElementById('result');
let planet_details = document.getElementById('planet_details')

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
    let res = await fetch(planet_url);
    let planet_data = await res.json();
    console.log(planet_data)

    planet_details.innerHTML = `
        <strong>Está é o Planeta: ${planet_data.name}</strong><br>
        Clima: ${planet_data.climate}<br>
        Tem ${planet_data.population} habitantes<br>
        Terreno: ${planet_data.terrain}<br>
    `;
};
