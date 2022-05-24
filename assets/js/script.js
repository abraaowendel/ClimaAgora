const alertLoading = document.querySelector('.alert')

const main = async () =>{
    alertLoading.innerHTML = 'Carregando...';
    try {
        const key = "82f0b5bc163a326a8b38d14133b50811";
        const cityUser = document.querySelector('#city').value;
        const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityUser)}&units=metric&appid=${key}`;
        const apiWeather = await fetch(urlAPI);
        const json = await apiWeather.json();

        if(json.cod === 200){
            removeResult();
            showResult(json)
        }
        else{
            throw{
                "erro": "errorCity",
                "message": "Não encontramos essa localização." 
            }
        }   
    } catch (error) {
        removeResult();
        showError(error.message);
    }
}

const showResult = (json) =>{
    alertLoading.innerHTML = '';
    const container = document.querySelector('.container');
    const result = document.createElement("div")

    result.classList.add('result')
    result.innerHTML = `
        <div class="result__city">${json.name}, ${json.sys.country}</div>
        <div class="result__data">
            <div class="result__temperature">
                <h4>Temperatura</h4>
                <div class="result__temperature-value">${json.main.temp}<sup> °C</sup></div>
            </div>
            <div class="result__wind">
                <h4>Vento</h4>
                <div class="result__wind-value">${json.wind.speed} km/h</div>
            </div>
        </div>
        <div class="result-images">
            <div class="result-images__weatherState">
                <img src="http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png">
            </div>
            <div class="result-images__windDirection">
                <div class="windDirection__ponter" style="transform: rotate(${json.wind.deg}deg) translate(0px)"></div>
            </div>
        </div>`
        container.insertBefore(result,alertLoading)
}

const removeResult = () => {
    alertLoading.innerHTML = '';
    const result = document.querySelector('.result');
    const container = document.querySelector('.container');
    if(result){
        container.removeChild(result)
    }
}

const showError =  (erro) =>  alertLoading.innerHTML = `${erro}`;

const search = document.querySelector('#search')
search.addEventListener('click', main)
