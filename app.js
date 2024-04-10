const apiKey = "78c6ea587ea5d5d98882fe3b2ccc46b2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
let weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    let response = await fetch(apiUrl + city +`&appid=${apiKey}`)
    if(response.status ==  "404"){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
        document.querySelector(".error").style.color = "red"
    } else {
        let data = await response.json()
        console.log(data);
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "<sup>°C</sup>";
        document.querySelector(".humidity p").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind p").innerHTML = data.wind.speed + " km/h";
       
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "./images/clouds.png"
        } else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./images/drizzle.png"
        } else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "./images/mist.png"
        } else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "./images/rain.png"
        } else if(data.weather[0].main == "Snow") {
            weatherIcon.src = "./images/snow.png"
        } else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "./images/clear.png"
        }
    
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
        let dates = document.querySelector(".date")
        currDate = new Date()
        dates.innerHTML = `<p>${currDate.toDateString()}<p/>`
        // dates.textContent = currDate.toDateString()
        
    }
   
}
searchBox.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        event.preventDefault()
        searchBtn.click()
        checkWeather(searchBox.value)
        searchBox.value = "";
    }  
})

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})

