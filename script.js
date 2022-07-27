
// Cria os elementos da página e os coloca no HTML

let containerMain = document.getElementById('containermain');


let headerUm = document.createElement('div');
headerUm.setAttribute('id','headerUm');
let midContainer = document.createElement('div');
midContainer.setAttribute('id','midContainer');
let bottomUm = document.createElement('div');
bottomUm.setAttribute('id','bottomUm');

containerMain.appendChild(headerUm);
containerMain.appendChild(midContainer);
containerMain.appendChild(bottomUm);



// Lógica das funções do site



let userInput = 'Campo Grande';

async function getLatLon(){

   
    let lat1 = 0
    let lon1 = 0
    let arr = []

    let response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=Campo Grande,MS,BR&appid=bd62cd97f106933657ec6927eaecb085', {mode: 'cors'})
    response = await response.json()

    lat1 = await response[0].lat
    lon1 = await response[0].lon

    arr[0] = lat1
    arr[1] = lon1

    

    return arr
}

async function getCityClimate(arr){

    
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${String(arr[0])}&lon=${String(arr[1])}&units=metric&lang=pt_br&appid=bd62cd97f106933657ec6927eaecb085`, {mode: 'cors'})
    response = await response.json()
    console.log(response)
}


async function GetWeatherData() {

    let arr = await getLatLon()
    await getCityClimate(arr)
}


GetWeatherData()




