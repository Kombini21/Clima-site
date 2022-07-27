
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

let cityLabel = document.createElement('label');
cityLabel.setAttribute('for','cityInput');
cityLabel.setAttribute('id','city-laberu');

let cityInput = document.createElement('input');
cityInput.setAttribute('type','text');
cityInput.setAttribute('id','city-input');
cityInput.setAttribute('name', 'cityInput');
cityInput.setAttribute('placeholder','Coloque aqui o nome da cidade.');

let cityBt = document.createElement('button');
cityBt.setAttribute('id','input-button');

midContainer.appendChild(cityLabel);
midContainer.appendChild(cityInput);
midContainer.appendChild(cityBt);



let tempAtual = document.createElement('div');
tempAtual.setAttribute('id', 'temp-atual');

let tempFeel = document.createElement('div');
tempFeel.setAttribute('id', 'temp-feel');

let cityName = document.createElement('div');
cityName.setAttribute('id','city-name');

let tempMax = document.createElement('div');
tempMax.setAttribute('id', 'temp-max');

let tempMin = document.createElement('div');
tempMin.setAttribute('id','temp-min');

let tempoTipo = document.createElement('div');
tempoTipo.setAttribute('id',' tempo-tipo');

let tempoTipoDesc = document.createElement('div');
tempoTipoDesc.setAttribute('id','tempo-tipo-desc');

let tempDataContainer = document.createElement('div');
tempDataContainer.setAttribute('id','temp-data-container');

tempDataContainer.appendChild(tempAtual);
tempDataContainer.appendChild(tempFeel);
tempDataContainer.appendChild(cityName);
tempDataContainer.appendChild(tempMax);
tempDataContainer.appendChild(tempMin);
tempDataContainer.appendChild(tempoTipo);
tempDataContainer.appendChild(tempoTipoDesc);

midContainer.appendChild(tempDataContainer);





let userInput = 'Campo Grande';

// Lógica das funções do site

////// Fetch dos dados usando a api

// Pega a longitude e latitude usando o input do user
async function getLatLon(){

   
    let lat1 = 0
    let lon1 = 0
    let arr = []

    let response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=Campo Grande,MS,BR&appid=bd62cd97f106933657ec6927eaecb085', {mode: 'cors'})
    response = await response.json();

    lat1 = await response[0].lat
    lon1 = await response[0].lon

    arr[0] = lat1
    arr[1] = lon1

    

    return arr
}

// Pega os dados do clima usando o longitude e latitude da cidade

async function getCityClimate(arr){

    let dataArr = [];
    
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${String(arr[0])}&lon=${String(arr[1])}&units=metric&lang=pt_br&appid=bd62cd97f106933657ec6927eaecb085`, {mode: 'cors'})
    response = await response.json();
    dataArr.push(response.main, response.name, response.weather, response.wind,response.sys );
    return dataArr
}


// Combina as duas funções para pegar os dados do clima da cidade escolhida

async function GetWeatherData() {

    let arr = await getLatLon();
    let weatherDataArr = await getCityClimate(arr);

    return weatherDataArr
}



////// Criação do layout do site


async function showSiteData(){ 

    let dadosDoWeather = await GetWeatherData();
    
    tempAtual.innerHTML = await dadosDoWeather[0].temp;
    tempFeel.innerHTML = await dadosDoWeather[0].feels_like;
    cityName.innerHTML = await dadosDoWeather[1];
    tempMax.innerHTML = await dadosDoWeather[0].temp_max;
    tempMin.innerHTML = await dadosDoWeather[0].temp_min;
    tempoTipo.innerHTML = await dadosDoWeather[2][0].main
    tempoTipoDesc.innerHTML = await dadosDoWeather[2][0].description;

}




showSiteData()






